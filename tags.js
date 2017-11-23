module.exports = function {
  var newprops = {};
  newprops.amenity = 'school';
  newprops.name = capitalize(obj.properties.nom_iiee);
  newprops.adrr = capitalize(obj.properties.direccin);
  newprops['isced:level'] = capitalize(obj.properties.nivel);
  newprops['addr:state'] = capitalize(obj.properties.departamen);
  newprops['addr:province'] = capitalize(obj.properties.provincia);
  newprops['adrr:district'] = capitalize(obj.properties.distrito);
  newprops['addr:subdistrict'] = capitalize(obj.properties.nom_ccpp);
  newprops.ele = obj.properties.altitud;
  newprops.source = 'minedu';
  newprops.ref = obj.properties.cod_modul;
  if (obj.properties.nivel && obj.properties.nivel.indexOf('Jardín') > -1) {
    newprops.amenity = 'kindergarten';
    delete newprops['isced:level']
  }
  if (obj.properties.nivel && obj.properties.nivel.indexOf('Inicial No Escolarizado') > -1) {
    obj = null;
    // newprops.amenity = 'kindergarten';
    // delete newprops['isced:level'];
    // newprops.note = obj.properties.nivel;
  }
  if (obj.properties.nivel && obj.properties.nivel.indexOf('Primaria') > -1) {
    newprops['isced:level'] = 'primary'
  }
  if (obj.properties.nivel && obj.properties.nivel.indexOf('Secundaria') > -1) {
    newprops['isced:level'] = 'secondary'
  }
  obj.properties = newprops;
  return obj;
}

function capitalize(str) {
  if (typeof str == 'string') {
    return str.toLowerCase().replace(/(^|\s)([a-z])/g, function(m, p1, p2) {
      return p1 + p2.toUpperCase();
    })
  }
  return str;
}