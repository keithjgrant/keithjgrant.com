var Parser = require('jade').Parser,
    nodePath = require('path');

function isTemplatePath (path) {
  return path[0] === '@';
}

function buildTemplatePath (path) {
  return nodePath.join(
    __dirname,
    '../src/jade',
    path.substr(1) + '.jade');
}

function CortadoParser(str, filename, options) {
    Parser.call(this, str, filename, options);
}
CortadoParser.prototype.__proto__ = Parser.prototype;

CortadoParser.prototype.resolvePath = function(path, purpose) {
    var _super = Parser.prototype.resolvePath;

    if (isTemplatePath(path)) {
        return buildTemplatePath(path);
    } else {
        return _super.call(this, path, purpose);
    }
};


module.exports = CortadoParser;
