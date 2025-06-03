import subprocess
import time
import webbrowser


def main():
    # Start the frontend development server
    frontend = subprocess.Popen(["npm", "run", "dev"], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    time.sleep(2)
    webbrowser.open("http://localhost:8080")
    try:
        frontend.wait()
    except KeyboardInterrupt:
        frontend.terminate()


if __name__ == "__main__":
    main()
