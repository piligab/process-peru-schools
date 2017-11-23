module.exports = function(obj) {
  if (_.isArray(obj)) {
    for (var k = 0; k < obj.length; k++) {
      obj[k] = replaceSC(obj[k])
    }
  } else {
    var keys = _.keys(obj)
    for (var i = 0; i < keys.length; i++) {
      if (_.isNull(obj[keys[i]])) {
        delete obj[keys[i]]
      } else if (obj[keys[i]].length > 254) {
        delete obj[keys[i]]
      } else if (keys[i].length === 0) {
        delete obj[keys[i]]
      } else {
        var key = slugify(keys[i]).toLowerCase()
        if (key !== keys[i]) {
          obj[key] = obj[keys[i]]
          delete obj[keys[i]]
        }
        if (_.isObject(obj[key]) && key !== 'geometry') {
          obj[key] = replaceSC(obj[key])
        } else if (typeof obj[key] === 'string' || obj[key] instanceof String) {
          obj[key] = obj[key].replace(/\s{2,}/g, ' ')
          var num = Number(obj[key])
          if (!_.isNaN(num)) {
            obj[key] = num
          }
        }
      }
    }
  }
  return obj
}

function slugify(str) {
  return str.toString().toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '_')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}