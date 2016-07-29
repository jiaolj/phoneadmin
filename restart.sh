pid=`ps -ef|grep "$1.ini"|grep -v "grep"|awk '{print $2}'`
if [ "$pid" = "" ] ; then
  echo "no server pid alive"
else
  echo "kill pid $pid now"
  kill -9 $pid
fi
nohup uwsgi --ini $1.ini &
