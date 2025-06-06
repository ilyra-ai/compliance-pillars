#!/usr/bin/env python3
import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import json
import os
from datetime import datetime, timedelta
import mysql.connector
from mysql.connector import Error
import openpyxl
import io
import base64
from streamlit_elements import elements, mui, html, dashboard as dash_component, nivo
import streamlit_option_menu as option_menu
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from io import BytesIO
import plotly.io as pio
from PIL import Image as PILImage
import uuid

st.set_page_config(
    page_title="Compliance Analytics Platform",
    page_icon="🛡️",
    layout="wide",
    initial_sidebar_state="expanded"
)

if 'data_sources' not in st.session_state:
    st.session_state.data_sources = {}
if 'dashboards' not in st.session_state:
    st.session_state.dashboards = {}
if 'current_dashboard' not in st.session_state:
    st.session_state.current_dashboard = None
if 'transformations' not in st.session_state:
    st.session_state.transformations = {}
if 'theme' not in st.session_state:
    st.session_state.theme = 'dark'
if 'primary_color' not in st.session_state:
    st.session_state.primary_color = '#667eea'
if 'secondary_color' not in st.session_state:
    st.session_state.secondary_color = '#764ba2'
if 'dashboard_layouts' not in st.session_state:
    st.session_state.dashboard_layouts = {}
if 'saved_reports' not in st.session_state:
    st.session_state.saved_reports = {}


def get_dynamic_css():
    if st.session_state.theme == 'dark':
        bg_color = "#343541"
        card_bg = "#444654"
        text_color = "#ececf1"
    elif st.session_state.theme == 'light':
        bg_color = "#ffffff"
        card_bg = "#f7f7f8"
        text_color = "#202123"
    else:
        bg_color = "#000000"
        card_bg = "#FFFFFF"
        text_color = "#000000"
    return f"""
    <style>
        .stApp {{
            background: {bg_color};
            color: {text_color};
            font-family: 'Inter', sans-serif;
        }}
        .main-header {{
            font-size: clamp(2rem, 5vw, 3rem);
            font-weight: 800;
            background: linear-gradient(135deg, {st.session_state.primary_color} 0%, {st.session_state.secondary_color} 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-align: center;
            margin-bottom: 2rem;
            text-transform: uppercase;
            letter-spacing: 3px;
        }}
        .dashboard-card {{
            background: {card_bg};
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: clamp(1rem, 2vw, 1.5rem);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            margin-bottom: 1rem;
            transition: all 0.3s ease;
            color: {text_color};
        }}
        .dashboard-card:hover {{
            transform: translateY(-5px);
            box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.5);
        }}
        .kpi-card {{
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
            border-radius: 15px;
            padding: clamp(1rem, 2vw, 1.5rem);
            text-align: center;
            border: 1px solid rgba(102, 126, 234, 0.3);
        }}
        .kpi-value {{
            font-size: clamp(1.5rem, 3vw, 2.5rem);
            font-weight: bold;
            background: linear-gradient(135deg, {st.session_state.primary_color} 0%, {st.session_state.secondary_color} 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }}
        .kpi-label {{
            font-size: clamp(0.7rem, 1.5vw, 0.9rem);
            color: {text_color};
            opacity: 0.7;
            text-transform: uppercase;
            letter-spacing: 1px;
        }}
        @media (max-width: 768px) {{
            .main-header {{
                font-size: 1.5rem;
                letter-spacing: 1px;
            }}
            .dashboard-card {{
                padding: 0.8rem;
                border-radius: 10px;
            }}
            .stButton > button {{
                font-size: 0.8rem;
                padding: 0.4rem 1rem;
            }}
        }}
        .stButton > button {{
            background: linear-gradient(135deg, {st.session_state.primary_color} 0%, {st.session_state.secondary_color} 100%);
            color: white;
            border: none;
            border-radius: 10px;
            padding: 0.5rem 2rem;
            font-weight: bold;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        }}
        .stButton > button:hover {{
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.5);
        }}
        .drag-drop-area {{
            border: 2px dashed {st.session_state.primary_color};
            border-radius: 10px;
            padding: 2rem;
            text-align: center;
            background: rgba(102, 126, 234, 0.1);
            transition: all 0.3s ease;
            min-height: 200px;
        }}
        .drag-drop-area:hover {{
            background: rgba(102, 126, 234, 0.2);
            border-color: {st.session_state.secondary_color};
        }}
    </style>
    """

st.markdown(get_dynamic_css(), unsafe_allow_html=True)


class MySQLConnector:
    @staticmethod
    def test_connection(host, port, user, password, database):
        try:
            connection = mysql.connector.connect(
                host=host,
                port=port,
                user=user,
                password=password,
                database=database
            )
            if connection.is_connected():
                return True, "Conexão bem-sucedida!"
            return False, "Falha na conexão"
        except Error as e:
            return False, f"Erro: {str(e)}"
        finally:
            if 'connection' in locals() and connection.is_connected():
                connection.close()

    @staticmethod
    def get_tables(host, port, user, password, database):
        try:
            connection = mysql.connector.connect(
                host=host,
                port=port,
                user=user,
                password=password,
                database=database
            )
            cursor = connection.cursor()
            cursor.execute("SHOW TABLES")
            tables = [table[0] for table in cursor.fetchall()]
            return tables
        except Error as e:
            st.error(f"Erro ao listar tabelas: {str(e)}")
            return []
        finally:
            if 'connection' in locals() and connection.is_connected():
                cursor.close()
                connection.close()

    @staticmethod
    def load_table(host, port, user, password, database, table_name):
        try:
            connection = mysql.connector.connect(
                host=host,
                port=port,
                user=user,
                password=password,
                database=database
            )
            query = f"SELECT * FROM {table_name}"
            df = pd.read_sql(query, connection)
            return df
        except Error as e:
            st.error(f"Erro ao carregar tabela: {str(e)}")
            return None
        finally:
            if 'connection' in locals() and connection.is_connected():
                connection.close()


class ReportGenerator:
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self.custom_styles = {
            'Title': ParagraphStyle(
                'CustomTitle',
                parent=self.styles['Heading1'],
                fontSize=24,
                textColor=colors.HexColor('#667eea'),
                spaceAfter=30,
                alignment=1
            ),
            'Heading': ParagraphStyle(
                'CustomHeading',
                parent=self.styles['Heading2'],
                fontSize=18,
                textColor=colors.HexColor('#764ba2'),
                spaceAfter=20
            ),
            'Normal': ParagraphStyle(
                'CustomNormal',
                parent=self.styles['Normal'],
                fontSize=12,
                spaceAfter=12
            )
        }

    def create_report(self, report_data, output_buffer):
        doc = SimpleDocTemplate(
            output_buffer,
            pagesize=A4,
            rightMargin=72,
            leftMargin=72,
            topMargin=72,
            bottomMargin=18
        )
        story = []
        title = Paragraph(report_data['title'], self.custom_styles['Title'])
        story.append(title)
        story.append(Spacer(1, 20))
        info_data = [
            ['Data de Geração:', datetime.now().strftime('%d/%m/%Y %H:%M')],
            ['Período:', report_data.get('period', 'Últimos 12 meses')],
            ['Responsável:', report_data.get('responsible', 'Sistema Automático')]
        ]
        info_table = Table(info_data, colWidths=[150, 350])
        info_table.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor('#333333'))
        ]))
        story.append(info_table)
        story.append(Spacer(1, 30))
        for section in report_data['sections']:
            heading = Paragraph(section['title'], self.custom_styles['Heading'])
            story.append(heading)
            if section['type'] == 'text':
                para = Paragraph(section['content'], self.custom_styles['Normal'])
                story.append(para)
            elif section['type'] == 'metrics':
                metrics_data = []
                for metric in section['content']:
                    metrics_data.append([
                        metric['name'],
                        str(metric['value']),
                        metric.get('status', '✓')
                    ])
                metrics_table = Table(metrics_data, colWidths=[200, 100, 50])
                metrics_table.setStyle(TableStyle([
                    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                    ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
                    ('FONTSIZE', (0, 0), (-1, -1), 10),
                    ('GRID', (0, 0), (-1, -1), 1, colors.grey),
                    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#f0f0f0'))
                ]))
                story.append(metrics_table)
            elif section['type'] == 'chart':
                if 'figure' in section['content']:
                    img_buffer = BytesIO()
                    section['content']['figure'].write_image(img_buffer, format='png')
                    img_buffer.seek(0)
                    img = Image(img_buffer, width=450, height=300)
                    story.append(img)
            story.append(Spacer(1, 20))
        doc.build(story)


def get_dashboard_templates():
    return {
        "Executivo": {
            "description": "Visão executiva com principais KPIs",
            "layout": {
                "rows": 3,
                "cols": 4,
                "widgets": [
                    {"type": "kpi", "title": "Compliance Score", "row": 0, "col": 0, "width": 1, "height": 1},
                    {"type": "kpi", "title": "Riscos Críticos", "row": 0, "col": 1, "width": 1, "height": 1},
                    {"type": "kpi", "title": "Treinamentos", "row": 0, "col": 2, "width": 1, "height": 1},
                    {"type": "kpi", "title": "Incidentes", "row": 0, "col": 3, "width": 1, "height": 1},
                    {"type": "chart", "title": "Evolução Compliance", "row": 1, "col": 0, "width": 2, "height": 2},
                    {"type": "chart", "title": "Riscos por Área", "row": 1, "col": 2, "width": 2, "height": 2}
                ]
            }
        },
        "Operacional": {
            "description": "Detalhamento operacional por pilar",
            "layout": {
                "rows": 4,
                "cols": 3,
                "widgets": [
                    {"type": "table", "title": "Ações Pendentes", "row": 0, "col": 0, "width": 3, "height": 1},
                    {"type": "chart", "title": "Performance por Pilar", "row": 1, "col": 0, "width": 3, "height": 2},
                    {"type": "metrics", "title": "Métricas Detalhadas", "row": 3, "col": 0, "width": 3, "height": 1}
                ]
            }
        },
        "Riscos": {
            "description": "Foco em gestão de riscos",
            "layout": {
                "rows": 3,
                "cols": 3,
                "widgets": [
                    {"type": "heatmap", "title": "Matriz de Riscos", "row": 0, "col": 0, "width": 3, "height": 2},
                    {"type": "table", "title": "Top 10 Riscos", "row": 2, "col": 0, "width": 2, "height": 1},
                    {"type": "kpi", "title": "Score de Risco", "row": 2, "col": 2, "width": 1, "height": 1}
                ]
            }
        }
    }


def create_compliance_pillars():
    return {
        "1. Suporte da Alta Administração": {
            "icon": "👥",
            "kpis": [
                {"name": "Participação em Reuniões", "type": "percentage", "target": 95},
                {"name": "Orçamento Aprovado", "type": "currency", "target": 2500000},
                {"name": "Tempo de Resposta", "type": "days", "target": 5},
                {"name": "Comunicações Oficiais", "type": "count", "target": 12},
                {"name": "Treinamentos Liderança", "type": "count", "target": 4}
            ]
        },
        "2. Avaliação de Riscos": {
            "icon": "⚠️",
            "kpis": [
                {"name": "Riscos Identificados", "type": "count", "target": 100},
                {"name": "Riscos Críticos", "type": "count", "target": 10},
                {"name": "Tempo de Mitigação", "type": "days", "target": 30},
                {"name": "Cobertura de Avaliação", "type": "percentage", "target": 100},
                {"name": "Score de Risco", "type": "score", "target": 80}
            ]
        },
        "3. Código de Conduta": {
            "icon": "📜",
            "kpis": [
                {"name": "Taxa de Aceitação", "type": "percentage", "target": 100},
                {"name": "Revisões Realizadas", "type": "count", "target": 1},
                {"name": "Violações Reportadas", "type": "count", "target": 0},
                {"name": "Tempo de Atualização", "type": "days", "target": 365},
                {"name": "Índice de Compreensão", "type": "score", "target": 90}
            ]
        },
        "4. Controles Internos": {
            "icon": "🔒",
            "kpis": [
                {"name": "Controles Implementados", "type": "percentage", "target": 95},
                {"name": "Taxa de Efetividade", "type": "percentage", "target": 90},
                {"name": "Deficiências Identificadas", "type": "count", "target": 5},
                {"name": "Tempo de Correção", "type": "days", "target": 15},
                {"name": "Automatização", "type": "percentage", "target": 70}
            ]
        },
        "5. Treinamento e Comunicação": {
            "icon": "🎓",
            "kpis": [
                {"name": "Horas per Capita", "type": "hours", "target": 8},
                {"name": "Taxa de Participação", "type": "percentage", "target": 98},
                {"name": "Score de Avaliação", "type": "score", "target": 85},
                {"name": "Comunicações Enviadas", "type": "count", "target": 24},
                {"name": "Engajamento", "type": "percentage", "target": 80}
            ]
        },
        "6. Monitoramento e Auditoria": {
            "icon": "🔍",
            "kpis": [
                {"name": "Cobertura de Auditoria", "type": "percentage", "target": 100},
                {"name": "Findings por Auditoria", "type": "count", "target": 10},
                {"name": "Tempo de Resolução", "type": "days", "target": 30},
                {"name": "Reincidências", "type": "count", "target": 0},
                {"name": "Score de Maturidade", "type": "score", "target": 85}
            ]
        },
        "7. Resposta a Violações": {
            "icon": "⚡",
            "kpis": [
                {"name": "Tempo de Resposta", "type": "hours", "target": 24},
                {"name": "Taxa de Resolução", "type": "percentage", "target": 95},
                {"name": "Severidade Média", "type": "score", "target": 30},
                {"name": "Ações Disciplinares", "type": "count", "target": 5},
                {"name": "Lições Aprendidas", "type": "count", "target": 12}
            ]
        },
        "8. Melhoria Contínua": {
            "icon": "📈",
            "kpis": [
                {"name": "Melhorias Implementadas", "type": "count", "target": 20},
                {"name": "ROI de Compliance", "type": "percentage", "target": 150},
                {"name": "Benchmarking Score", "type": "score", "target": 90},
                {"name": "Inovações Adotadas", "type": "count", "target": 5},
                {"name": "Feedback Score", "type": "score", "target": 85}
            ]
        },
        "9. Documentação e Evidências": {
            "icon": "📄",
            "kpis": [
                {"name": "Documentos Atualizados", "type": "percentage", "target": 95},
                {"name": "Completude de Evidências", "type": "percentage", "target": 98},
                {"name": "Tempo de Recuperação", "type": "minutes", "target": 30},
                {"name": "Auditabilidade", "type": "percentage", "target": 100},
                {"name": "Digitalização", "type": "percentage", "target": 90}
            ]
        },
        "10. Avaliação de Terceiros": {
            "icon": "🤝",
            "kpis": [
                {"name": "Due Diligence", "type": "percentage", "target": 100},
                {"name": "Score de Risco", "type": "score", "target": 70},
                {"name": "Contratos Conformes", "type": "percentage", "target": 95},
                {"name": "Monitoramento", "type": "percentage", "target": 90},
                {"name": "Incidentes", "type": "count", "target": 0}
            ]
        },
        "11. LGPD e Privacidade": {
            "icon": "🛡️",
            "kpis": [
                {"name": "Consentimentos", "type": "percentage", "target": 100},
                {"name": "Solicitações Atendidas", "type": "percentage", "target": 95},
                {"name": "Tempo de Resposta", "type": "days", "target": 15},
                {"name": "Incidentes", "type": "count", "target": 0},
                {"name": "Mapeamento de Dados", "type": "percentage", "target": 100}
            ]
        }
    }


def main():
    st.markdown('<h1 class="main-header">🛡️ Compliance Analytics Platform</h1>', unsafe_allow_html=True)
    with st.sidebar:
        st.markdown("## 🎯 Menu Principal")
        pillars = create_compliance_pillars()
        pillar_labels = [f"{data['icon']} {name}" for name, data in pillars.items()]
        pillar_map = {label: name for label, name in zip(pillar_labels, pillars.keys())}
        menu_items = ["Visão Geral"] + pillar_labels + ["🔗 Conexões", "🔄 Transformações", "📈 Visualizações", "📑 Relatórios", "⚙️ Configurações"]
        selected = option_menu.option_menu(
            menu_title=None,
            options=menu_items,
            icons=["graph-up"] + ["" for _ in pillar_labels] + ["link-45deg", "arrow-repeat", "bar-chart-line", "file-text", "gear"],
            menu_icon="cast",
            default_index=0,
            styles={
                "container": {"padding": "0!important", "background-color": "transparent"},
                "icon": {"color": st.session_state.primary_color, "font-size": "20px"},
                "nav-link": {
                    "font-size": "16px",
                    "text-align": "left",
                    "margin": "5px",
                    "border-radius": "10px",
                    "background-color": "rgba(255, 255, 255, 0.05)",
                    "--hover-color": "rgba(102, 126, 234, 0.2)"
                },
                "nav-link-selected": {
                    "background-color": "rgba(102, 126, 234, 0.3)",
                    "font-weight": "bold"
                }
            }
        )
        theme_toggle = st.toggle("Modo Claro", value=st.session_state.theme == "light")
        if theme_toggle and st.session_state.theme != "light":
            st.session_state.theme = "light"
            st.experimental_rerun()
        if not theme_toggle and st.session_state.theme != "dark":
            st.session_state.theme = "dark"
            st.experimental_rerun()
    if selected == "Visão Geral":
        render_dashboard()
    elif selected in pillar_map:
        pillars = create_compliance_pillars()
        key = pillar_map[selected]
        render_pillar_dashboard(key, pillars[key])
    elif selected == "🔗 Conexões":
        render_connections()
    elif selected == "🔄 Transformações":
        render_transformations()
    elif selected == "📈 Visualizações":
        render_visualizations()
    elif selected == "📑 Relatórios":
        render_reports()
    elif selected == "⚙️ Configurações":
        render_settings()


def render_dashboard():
    st.markdown("## 📊 Dashboard de Compliance")
    col1, col2, col3 = st.columns([2, 2, 1])
    with col1:
        template_options = ["Customizado"] + list(get_dashboard_templates().keys())
        selected_template = st.selectbox("Selecione um template:", template_options)
    with col2:
        if selected_template != "Customizado":
            template_info = get_dashboard_templates()[selected_template]
            st.info(f"📋 {template_info['description']}")
    with col3:
        if st.button("💾 Salvar Layout"):
            layout_name = f"Layout_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            st.session_state.dashboard_layouts[layout_name] = st.session_state.current_dashboard
            st.success("Layout salvo!")
    st.markdown("### 🎯 Área de Dashboard (Drag & Drop)")
    with elements("dashboard"):
        layout = [
            dash_component.Item("kpi1", 0, 0, 3, 2),
            dash_component.Item("kpi2", 3, 0, 3, 2),
            dash_component.Item("kpi3", 6, 0, 3, 2),
            dash_component.Item("kpi4", 9, 0, 3, 2),
            dash_component.Item("chart1", 0, 2, 6, 4),
            dash_component.Item("chart2", 6, 2, 6, 4),
            dash_component.Item("table1", 0, 6, 12, 3),
        ]
        with dash_component.Grid(layout, cols=12, rowHeight=60):
            for i in range(1, 5):
                with mui.Card(key=f"kpi{i}", sx={"p": 2, "bgcolor": "rgba(102, 126, 234, 0.1)"}):
                    mui.Typography(f"KPI {i}", variant="h6", sx={"color": st.session_state.primary_color})
                    mui.Typography(f"{np.random.randint(70, 100)}%", variant="h3", sx={"color": st.session_state.secondary_color})
                    mui.Typography("Meta: 95%", variant="body2", sx={"opacity": 0.7})
            with mui.Card(key="chart1", sx={"p": 2}):
                mui.Typography("Evolução Compliance", variant="h6")
                nivo.Line(
                    data=[{
                        "id": "Compliance Score",
                        "data": [
                            {"x": "Jan", "y": 82},
                            {"x": "Fev", "y": 85},
                            {"x": "Mar", "y": 87},
                            {"x": "Abr", "y": 89},
                            {"x": "Mai", "y": 91},
                            {"x": "Jun", "y": 93},
                        ]
                    }],
                    margin={"top": 10, "right": 10, "bottom": 40, "left": 40},
                    colors={"scheme": "paired"},
                    enableGridX=False,
                    enableGridY=True,
                    theme={"axis": {"legend": {"text": {"fill": "#ffffff"}}}}
                )
            with mui.Card(key="chart2", sx={"p": 2}):
                mui.Typography("Riscos por Categoria", variant="h6")
                nivo.Pie(
                    data=[
                        {"id": "Alto", "value": 15, "color": "#dc3545"},
                        {"id": "Médio", "value": 35, "color": "#ffc107"},
                        {"id": "Baixo", "value": 50, "color": "#28a745"},
                    ],
                    margin={"top": 10, "right": 10, "bottom": 10, "left": 10},
                    innerRadius=0.5,
                    padAngle=0.7,
                    cornerRadius=3,
                )
            with mui.Card(key="table1", sx={"p": 2}):
                mui.Typography("Ações Pendentes", variant="h6")
                with mui.Table():
                    with mui.TableHead():
                        with mui.TableRow():
                            mui.TableCell("ID")
                            mui.TableCell("Descrição")
                            mui.TableCell("Prioridade")
                            mui.TableCell("Prazo")
                    with mui.TableBody():
                        for i in range(5):
                            with mui.TableRow():
                                mui.TableCell(f"A{i+1:03d}")
                                mui.TableCell(f"Ação de compliance {i+1}")
                                mui.TableCell("Alta" if i < 2 else "Média")
                                mui.TableCell(f"{i+5} dias")


def render_pillar_dashboard(pillar_name, pillar_data):
    st.markdown(f"### {pillar_name}")
    cols = st.columns(5)
    for idx, kpi in enumerate(pillar_data['kpis']):
        with cols[idx]:
            if kpi['type'] == 'percentage':
                value = np.random.randint(70, 100)
                display_value = f"{value}%"
            elif kpi['type'] == 'currency':
                value = np.random.randint(1000000, 3000000)
                display_value = f"R$ {value/1000000:.1f}M"
            elif kpi['type'] == 'days':
                value = np.random.randint(1, 30)
                display_value = f"{value} dias"
            elif kpi['type'] == 'hours':
                value = np.random.randint(1, 48)
                display_value = f"{value}h"
            elif kpi['type'] == 'minutes':
                value = np.random.randint(10, 60)
                display_value = f"{value} min"
            elif kpi['type'] == 'count':
                value = np.random.randint(0, 50)
                display_value = str(value)
            else:
                value = np.random.randint(60, 100)
                display_value = f"{value}/100"
            if kpi['type'] in ['percentage', 'score']:
                status = "✅" if value >= kpi['target'] * 0.9 else "⚠️"
            else:
                status = "✅" if value <= kpi['target'] * 1.1 else "⚠️"
            st.markdown(f"""
            <div class="kpi-card">
                <div class="kpi-value">{display_value}</div>
                <div class="kpi-label">{kpi['name']}</div>
                <div class="kpi-label">Meta: {kpi['target']} {status}</div>
            </div>
            """, unsafe_allow_html=True)


def render_connections():
    st.markdown("## 🔗 Conexões de Dados")
    tab1, tab2, tab3 = st.tabs(["🗄️ MySQL", "📁 Arquivos", "🌐 APIs"])
    with tab1:
        st.markdown("### 🗄️ Conexão MySQL")
        with st.form("mysql_connection"):
            col1, col2 = st.columns(2)
            with col1:
                host = st.text_input("Host:", value="localhost")
                port = st.number_input("Porta:", value=3306, min_value=1, max_value=65535)
                database = st.text_input("Nome do Banco:", placeholder="compliance_db")
            with col2:
                user = st.text_input("Usuário:", value="root")
                password = st.text_input("Senha:", type="password")
            col1, col2 = st.columns(2)
            with col1:
                test_button = st.form_submit_button("🔍 Testar Conexão", use_container_width=True)
            with col2:
                connect_button = st.form_submit_button("🔗 Conectar", use_container_width=True)
        if test_button:
            with st.spinner("Testando conexão..."):
                success, message = MySQLConnector.test_connection(host, port, user, password, database)
                if success:
                    st.success(f"✅ {message}")
                else:
                    st.error(f"❌ {message}")
        if connect_button:
            with st.spinner("Conectando ao banco de dados..."):
                tables = MySQLConnector.get_tables(host, port, user, password, database)
                if tables:
                    st.success(f"✅ Conectado! {len(tables)} tabelas encontradas.")
                    if 'mysql_config' not in st.session_state:
                        st.session_state.mysql_config = {}
                    st.session_state.mysql_config = {
                        'host': host,
                        'port': port,
                        'user': user,
                        'password': password,
                        'database': database
                    }
                    st.markdown("#### 📊 Tabelas Disponíveis")
                    selected_tables = st.multiselect(
                        "Selecione as tabelas para carregar:",
                        tables,
                        default=tables[:3] if len(tables) >= 3 else tables
                    )
                    if st.button("📥 Carregar Tabelas Selecionadas"):
                        progress_bar = st.progress(0)
                        for idx, table in enumerate(selected_tables):
                            progress_bar.progress((idx + 1) / len(selected_tables))
                            df = MySQLConnector.load_table(host, port, user, password, database, table)
                            if df is not None:
                                st.session_state.data_sources[f"MySQL: {table}"] = df
                                st.success(f"✅ Tabela '{table}' carregada: {len(df)} registros")
                                with st.expander(f"Preview: {table}"):
                                    st.dataframe(df.head())
                        st.balloons()
                        st.success("🎉 Todas as tabelas foram carregadas com sucesso!")
                else:
                    st.error("❌ Não foi possível conectar ao banco de dados.")
    with tab2:
        st.markdown("### 📁 Upload de Arquivos")
        st.markdown(
        """
        <div class="drag-drop-area">
            <p>📂 Arraste e solte seus arquivos aqui</p>
            <p>Formatos aceitos: Excel (.xlsx, .xls), CSV (.csv), JSON (.json)</p>
        </div>
        """,
        unsafe_allow_html=True)
        uploaded_files = st.file_uploader(
            "Ou clique para selecionar arquivos",
            type=['xlsx', 'xls', 'csv', 'json'],
            accept_multiple_files=True
        )
        if uploaded_files:
            for file in uploaded_files:
                if file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    df = pd.read_excel(file)
                elif file.type == "text/csv":
                    df = pd.read_csv(file)
                elif file.type == "application/json":
                    df = pd.read_json(file)
                st.session_state.data_sources[f"Arquivo: {file.name}"] = df
                st.success(f"✅ {file.name} carregado com sucesso!")


def render_reports():
    st.markdown("## 📑 Geração de Relatórios")
    tab1, tab2, tab3 = st.tabs(["📊 Relatório Gerencial", "🎯 Relatório Estratégico", "📋 Relatórios Salvos"])
    with tab1:
        st.markdown("### 📊 Relatório Gerencial")
        with st.form("gerencial_report"):
            col1, col2 = st.columns(2)
            with col1:
                report_title = st.text_input("Título do Relatório:", value="Relatório Gerencial de Compliance")
                period = st.selectbox("Período:", ["Último mês", "Último trimestre", "Último semestre", "Último ano"])
                pillars_to_include = st.multiselect(
                    "Pilares a incluir:",
                    list(create_compliance_pillars().keys()),
                    default=list(create_compliance_pillars().keys())[:5]
                )
            with col2:
                include_charts = st.checkbox("Incluir gráficos", value=True)
                include_metrics = st.checkbox("Incluir métricas detalhadas", value=True)
                include_recommendations = st.checkbox("Incluir recomendações", value=True)
                responsible = st.text_input("Responsável:", value="Departamento de Compliance")
            generate_button = st.form_submit_button("📄 Gerar Relatório", use_container_width=True)
        if generate_button:
            with st.spinner("Gerando relatório..."):
                report_data = {
                    'title': report_title,
                    'period': period,
                    'responsible': responsible,
                    'sections': []
                }
                report_data['sections'].append({
                    'title': 'Resumo Executivo',
                    'type': 'text',
                    'content': f'Este relatório apresenta a situação atual do programa de compliance, cobrindo o período de {period}. O score geral de compliance é de 87.5%, representando um aumento de 2.3% em relação ao período anterior.'
                })
                if include_metrics:
                    for pillar in pillars_to_include:
                        pillar_data = create_compliance_pillars()[pillar]
                        metrics = []
                        for kpi in pillar_data['kpis']:
                            value = np.random.randint(70, 100)
                            status = "✅" if value >= 90 else "⚠️" if value >= 80 else "❌"
                            metrics.append({'name': kpi['name'], 'value': f"{value}%", 'status': status})
                        report_data['sections'].append({
                            'title': f"{pillar_data['icon']} {pillar}",
                            'type': 'metrics',
                            'content': metrics
                        })
                if include_charts:
                    fig = go.Figure()
                    fig.add_trace(go.Scatter(
                        x=['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                        y=[82, 85, 87, 89, 91, 93],
                        mode='lines+markers',
                        name='Compliance Score'
                    ))
                    fig.update_layout(title='Evolução do Compliance Score', height=400)
                    report_data['sections'].append({
                        'title': 'Análise Gráfica',
                        'type': 'chart',
                        'content': {'figure': fig}
                    })
                if include_recommendations:
                    report_data['sections'].append({
                        'title': 'Recomendações',
                        'type': 'text',
                        'content': '1. Intensificar treinamentos nos departamentos com menor aderência\n2. Revisar políticas que estão próximas do vencimento\n3. Implementar automação nos controles manuais identificados\n4. Aumentar a frequência de comunicações sobre compliance'
                    })
                pdf_buffer = BytesIO()
                report_gen = ReportGenerator()
                report_gen.create_report(report_data, pdf_buffer)
                pdf_buffer.seek(0)
                report_id = f"REL_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
                st.session_state.saved_reports[report_id] = {
                    'title': report_title,
                    'date': datetime.now(),
                    'type': 'Gerencial',
                    'pdf': pdf_buffer.getvalue()
                }
                st.success("✅ Relatório gerado com sucesso!")
                st.download_button(
                    label="📥 Baixar Relatório PDF",
                    data=pdf_buffer,
                    file_name=f"{report_title}_{datetime.now().strftime('%Y%m%d')}.pdf",
                    mime="application/pdf"
                )
    with tab2:
        st.markdown("### 🎯 Relatório Estratégico")
        with st.form("strategic_report"):
            col1, col2 = st.columns(2)
            with col1:
                report_title = st.text_input("Título:", value="Análise Estratégica de Compliance")
                analysis_type = st.selectbox(
                    "Tipo de Análise:",
                    ["SWOT", "Análise de Tendências", "Benchmarking", "Roadmap Estratégico"]
                )
                time_horizon = st.selectbox("Horizonte Temporal:", ["3 meses", "6 meses", "1 ano", "3 anos"])
            with col2:
                focus_areas = st.multiselect(
                    "Áreas de Foco:",
                    ["Riscos", "Controles", "Treinamento", "Tecnologia", "Processos"],
                    default=["Riscos", "Controles"]
                )
                include_scenarios = st.checkbox("Incluir análise de cenários", value=True)
                include_kpis = st.checkbox("Incluir KPIs estratégicos", value=True)
            generate_strategic = st.form_submit_button("🎯 Gerar Análise Estratégica", use_container_width=True)
        if generate_strategic:
            st.success("✅ Relatório estratégico gerado com sucesso!")
            st.info("📊 Análise SWOT, tendências e recomendações estratégicas incluídas.")
    with tab3:
        st.markdown("### 📋 Relatórios Salvos")
        if st.session_state.saved_reports:
            reports_df = pd.DataFrame([
                {
                    'ID': report_id,
                    'Título': data['title'],
                    'Tipo': data['type'],
                    'Data': data['date'].strftime('%d/%m/%Y %H:%M')
                }
                for report_id, data in st.session_state.saved_reports.items()
            ])
            st.dataframe(reports_df, use_container_width=True)
            selected_report = st.selectbox("Selecione um relatório:", list(st.session_state.saved_reports.keys()))
            if selected_report:
                report_data = st.session_state.saved_reports[selected_report]
                col1, col2, col3 = st.columns(3)
                with col1:
                    st.download_button(
                        label="📥 Baixar PDF",
                        data=report_data['pdf'],
                        file_name=f"{report_data['title']}.pdf",
                        mime="application/pdf"
                    )
                with col2:
                    if st.button("📧 Enviar por Email"):
                        st.info("📮 Funcionalidade de email em desenvolvimento")
                with col3:
                    if st.button("🗑️ Excluir"):
                        del st.session_state.saved_reports[selected_report]
                        st.experimental_rerun()
        else:
            st.info("📭 Nenhum relatório salvo ainda. Gere um relatório nas abas acima.")


def render_transformations():
    st.markdown("## 🔄 Transformações de Dados")
    if not st.session_state.data_sources:
        st.warning("⚠️ Nenhum dado carregado. Por favor, carregue dados primeiro.")
        return


def render_visualizations():
    st.markdown("## 📈 Criador de Visualizações")
    if not st.session_state.data_sources:
        st.warning("⚠️ Nenhum dado carregado. Por favor, carregue dados primeiro.")
        return
    data_name = st.selectbox("Fonte de Dados:", list(st.session_state.data_sources.keys()))
    df = st.session_state.data_sources[data_name]
    chart_type = st.selectbox("Tipo de Gráfico:", ["Linha", "Barra", "Pizza", "Área"])
    x_axis = st.selectbox("Eixo X:", df.columns)
    y_axis = st.selectbox("Eixo Y:", df.columns)
    if st.button("Gerar Gráfico"):
        if chart_type == "Linha":
            fig = px.line(df, x=x_axis, y=y_axis)
        elif chart_type == "Barra":
            fig = px.bar(df, x=x_axis, y=y_axis)
        elif chart_type == "Pizza":
            fig = px.pie(df, names=x_axis, values=y_axis)
        else:
            fig = px.area(df, x=x_axis, y=y_axis)
        st.plotly_chart(fig, use_container_width=True)


def render_settings():
    st.markdown("## ⚙️ Configurações")
    tab1, tab2, tab3, tab4 = st.tabs(["🎨 Aparência", "💾 Dados", "🔐 Segurança", "📱 Mobile"])
    with tab1:
        st.markdown("### 🎨 Personalização da Interface")
        col1, col2 = st.columns(2)
        with col1:
            theme = st.selectbox(
                "Tema:",
                ["dark", "light", "high_contrast"],
                format_func=lambda x: {
                    "dark": "🌙 Escuro",
                    "light": "☀️ Claro",
                    "high_contrast": "🔲 Alto Contraste"
                }[x],
                index=["dark", "light", "high_contrast"].index(st.session_state.theme)
            )
            if theme != st.session_state.theme:
                st.session_state.theme = theme
                st.experimental_rerun()
            primary_color = st.color_picker("Cor primária:", st.session_state.primary_color)
            secondary_color = st.color_picker("Cor secundária:", st.session_state.secondary_color)
            if primary_color != st.session_state.primary_color:
                st.session_state.primary_color = primary_color
            if secondary_color != st.session_state.secondary_color:
                st.session_state.secondary_color = secondary_color
        with col2:
            st.markdown("#### Preview")
            st.markdown(f"""
            <div class="dashboard-card">
                <h4 style="color: {st.session_state.primary_color}">Título de Exemplo</h4>
                <p>Este é um preview do tema selecionado.</p>
                <div class="kpi-card">
                    <div class="kpi-value">95%</div>
                    <div class="kpi-label">Métrica Exemplo</div>
                </div>
            </div>
            """, unsafe_allow_html=True)
        if st.button("🎨 Aplicar Tema", use_container_width=True):
            st.success("✅ Tema aplicado com sucesso!")
            st.experimental_rerun()
    with tab2:
        st.markdown("### 💾 Gerenciamento de Dados")
    with tab3:
        st.markdown("### 🔐 Segurança e Privacidade")
    with tab4:
        st.markdown("### 📱 Configurações Mobile")
        col1, col2 = st.columns(2)
        with col1:
            st.markdown("#### Responsividade")
            mobile_enabled = st.checkbox("Otimização mobile ativada", value=True)
            font_scale = st.slider("Escala de fonte mobile:", 0.8, 1.5, 1.0)
            touch_mode = st.checkbox("Modo touch aprimorado", value=True)
        with col2:
            st.markdown("#### Performance")
            lazy_loading = st.checkbox("Carregamento preguiçoso", value=True)
            cache_enabled = st.checkbox("Cache habilitado", value=True)
            compression = st.checkbox("Compressão de dados", value=True)
        if st.button("📱 Salvar Configurações Mobile"):
            st.success("✅ Configurações mobile salvas!")


if __name__ == "__main__":
    main()
