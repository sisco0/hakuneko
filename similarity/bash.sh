website_function() {
  local template=$1
  local compare=$2
  local outfile=$3
  local WEBSITE=$4
  # Get first working URL for this class
  # Get host
  URL=`cat ${WEBSITE} | grep "this.url" | head -1 | cut -d "'" -f 2`
  URLPATH=`cat ${WEBSITE} | grep "this.path" | head -1 | cut -d "'" -f 2`
  #URL=${URL}${URLPATH}
  if [ "${URL}" != "" ]
  then
    HTTPCODE=`curl -L -m 20 -s -o /dev/null -w "%{http_code}" ${URL}`
    if [ ${HTTPCODE} -eq 200 ]
    then
      tput setaf 2;echo "${URL} for ${template}"
      scores=`python3 main.py ${compare} ${URL}`
      csv_line="${template} ${URL} ${scores}"
      echo "${csv_line}" >> ${outfile}
    else
      tput setaf 1;>&2 echo "error ${URL} for ${template} in ${WEBSITE}"
    fi
  fi
}

template_function(){
  local template=$1
  local compare=$2
  local outfile=$3
  # Get list of projects for each template
  WEBSITES=`grep -iRn "extends ${template}" ${CONNFOLDER}/*.mjs | awk '{print $1}' | cut -d ":" -f 1`
  for WEBSITE in $WEBSITES; do
    if test "$(jobs | wc -l)" -ge 8; then
      wait
    fi
    {
      website_function "${template}" "${compare}" "${outfile}" "${WEBSITE}"
    }&
  done
}

CONNFOLDER="../src/web/mjs/connectors"
COMPARE="$1"
OUTFILE="$2"
rm -rf ${OUTFILE}
touch ${OUTFILE}
echo "Comparing ${COMPARE}, writing results to ${OUTFILE}"


TEMPLATES=`grep -iRn "export default class" ${CONNFOLDER}/templates/ | awk '{print $4}'`
for TEMPLATE in $TEMPLATES; do 
  if test "$(jobs | wc -l)" -ge 4; then
    wait
  fi
  {
    template_function "${TEMPLATE}" "${COMPARE}" "${OUTFILE}.tmp" 
  }&
done
while test "$(jobs | wc -l)" -ge 1
do
  wait
done
echo "Finished templates"
#LC_ALL=C sort -t" " -k4 -r ${OUTFILE}.tmp > ${OUTFILE}
#rm -rf ${OUTFILE}.tmp
#cat ${OUTFILE}
