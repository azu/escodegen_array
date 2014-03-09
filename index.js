var esprima = require("esprima");
var escodegen = require("escodegen");
var estraverse = require("estraverse");
function main(code) {
    var ast = esprima.parse(code, {range: true});

    function createHelper(src) {
        return {
            getCodeFromRange: function (range) {
                if (!src || !range) {
                    return null;
                }
                return src.substring(range[0], range[1]);
            }

        }
    }

    var helper = createHelper(code);
    // for escodegen format issue
    // https://twitter.com/azu_re/status/442619373635657728
    // https://twitter.com/constellation/status/442619849617833984
    function embedVerbatim(node) {
        var embed = helper.getCodeFromRange(node.range);
        if (embed) {
            node["x-verbatim-property"] = {
                content : embed,
                precedence : escodegen.Precedence.Primary
            }
        }
    }

    // edit AST ...
    estraverse.traverse(ast, {
        enter: function enter(node, parent) {
            var fn = {
                "ArrayExpression": embedVerbatim
            }[node.type];
            if (fn) {
                fn(node, parent);
            }
        }
    });

    return escodegen.generate(ast, {
        verbatim: "x-verbatim-property"
    });
}
module.exports = main;