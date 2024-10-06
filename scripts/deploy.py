import os, sys, paramiko, subprocess, shutil
from dotenv import load_dotenv, find_dotenv
from os import getenv
from git import Repo
load_dotenv(find_dotenv())

app = getenv("APP")
github = getenv("GITHUB_URL")
host = getenv("HOST")
username = getenv("USER")
password = getenv("HOST_PASS")
container_name = getenv("CONTAINER_NAME")

scripts_dir = os.path.abspath(__file__).replace('deploy.py', '')

if Repo().head.ref.name == 'main':
    try:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(host, username=username, password=password)
        sftp = ssh.open_sftp()

        try:
           sftp.chdir(app)
           subprocess.check_output('npm version patch', shell=True)
           subprocess.check_output('git push origin main', shell=True)
           os.system(scripts_dir + 'update_env.sh')
           stdin, stdout, stderr = ssh.exec_command('cd ' + app + '; git pull' + '; docker compose up --build -d')
           print(stdout.read().decode())
        except IOError as e:
           print(e)
           sys.exit(0)
        print('success deploy')
        stdin.close()
        sys.exit(0)
    except ValueError as e:
        print(e)
        sys.exit(1)
else:
   print('main only')
   sys.exit(1)
