#/bin/bash
chmod 775 mysql_root_password.txt
chmod 775 mysql_database.txt
chmod 775 mysql_user.txt
docker secret create  mysql_root_password mysql_root_password.txt
docker secret create  mysql_database mysql_database.txt
docker secret create  mysql_user mysql_user.txt
docker secret ls
    