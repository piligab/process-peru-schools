var _ = require('underscore');

module.exports = function(obj) {
  var newprops = {};
  newprops.amenity = 'school';
  newprops.name = capitalize(obj.properties.nom_iiee);
  newprops['addr:full'] = capitalize(obj.properties.direccin);
  newprops['isced:level'] = capitalize(obj.properties.nivel);
  newprops['addr:state'] = capitalize(obj.properties.departamen);
  newprops['addr:province'] = capitalize(obj.properties.provincia);
  newprops['addr:district'] = capitalize(obj.properties.distrito);
  newprops['addr:subdistrict'] = capitalize(obj.properties.nom_ccpp);
  newprops.ele = obj.properties.altitud;
  newprops.source = 'minedu.gob.pe';
  newprops.ref = obj.properties.cod_modular;

  if (obj.properties.nivel && obj.properties.nivel.indexOf('Jardín') > -1) {
    newprops.amenity = 'kindergarten';
    delete newprops['isced:level'];

    if (_.isNumber(newprops.name)) {
      newprops.name = 'Institución educativa inicial No. ' + newprops.name;
    } else {
      newprops.name = 'Institución educativa inicial ' + newprops.name;
    }
  }
  if (obj.properties.nivel && obj.properties.nivel.indexOf('Primaria') > -1) {
    newprops['isced:level'] = 'primary';
    if (_.isNumber(newprops.name)) {
      newprops.name = 'Institución Educativa No. ' + newprops.name;
    } else {
      newprops.name = 'Institución Educativa ' + newprops.name;
    }
  }
  if (obj.properties.nivel && obj.properties.nivel.indexOf('Secundaria') > -1) {
    newprops['isced:level'] = 'secondary';
    if (_.isNumber(newprops.name)) {
      newprops.name = 'Institución educativa No. ' + newprops.name;
    } else {
      newprops.name = 'Institución Educativa ' + newprops.name;
    }
  }
  newprops.note = capitalize(obj.properties.fuente);
  if (obj.properties.nivel && obj.properties.nivel.indexOf('Inicial No Escolarizado') > -1) {
    newprops = null;
    // newprops.amenity = 'kindergarten';
    // delete newprops['isced:level'];
    // newprops.note = obj.properties.nivel;
  }
  obj.properties = newprops;
  return obj.properties ? obj : null;
};

function capitalize(str) {
  if (typeof str == 'string') {
    return str.toLowerCase().replace(/(^|\s)([a-z])/g, function(m, p1, p2) {
      return p1 + p2.toUpperCase();
    });
  }
  return str;
}
