SOURCE=src/plugins/brand/terms.toml
cat ${SOURCE} | sed -e 's/(/（/g' -e 's/)/）/g' >temp
mv temp ${SOURCE}
yj -tj <${SOURCE} | jq >src/plugins/brand/terms.json

SOURCE=src/plugins/brand/policy.toml
cat ${SOURCE} | sed -e 's/(/（/g' -e 's/)/）/g' >temp
mv temp ${SOURCE}
yj -tj <${SOURCE} | jq >src/plugins/brand/policy.json
