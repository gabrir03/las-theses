
$identify("org/mathdox/formulaeditor/modules/relation1/gt.js");

$require("org/mathdox/parsing/ParserGenerator.js");
$require("org/mathdox/formulaeditor/parsing/openmath/OpenMathParser.js");
$require("org/mathdox/formulaeditor/parsing/expression/ExpressionContextParser.js");
$require("org/mathdox/formulaeditor/semantics/MultaryOperation.js");
$require("org/mathdox/formulaeditor/semantics/Keyword.js");

$main(function(){

  var symbol = {
    onscreen : ">",
    openmath : null, // use default with model:cd and model:name
    mathml   : "<mo>&gt;</mo>"
  };

  /**
   * Define a semantic tree node that represents relation1.gt.
   */
  org.mathdox.formulaeditor.semantics.Relation1Gt =
    $extend(org.mathdox.formulaeditor.semantics.MultaryOperation, {

      symbol : {

        onscreen : symbol.onscreen,
        openmath : "<OMS cd='relation1' name='gt'/>",
        mathml   : symbol.mathml

      },

      associative : true,
      precedence : 110

    });
  
  /**
   * Extend the OpenMathParser object with parsing code for relation1.gt.
   */
  org.mathdox.formulaeditor.parsing.openmath.OpenMathParser =
    $extend(org.mathdox.formulaeditor.parsing.openmath.OpenMathParser, {

    /**
     * Returns an equality object based on the OpenMath node.
     */
    handleRelation1Gt : function(node) {

      // parse the children of the OMA
      var children = node.childNodes;
      var operands = [];
      for (var i=1; i<children.length; i++) {
        operands.push(this.handle(children.item(i)));
      }

      // construct the corresponding object
      var result = new org.mathdox.formulaeditor.semantics.Relation1Gt();
      result.initialize.apply(result, operands);

      return result;

    }

  });

  org.mathdox.formulaeditor.parsing.openmath.KeywordList["relation1__gt"] = new org.mathdox.formulaeditor.semantics.Keyword("relation1", "gt", symbol, "infix");

  /**
   * Add the parsing code for an infix-once symbol.
   */
  var semantics = org.mathdox.formulaeditor.semantics;
  var pG = new org.mathdox.parsing.ParserGenerator();

  if ( ">" == ">" ) {
    // only one expression, same on screen
    org.mathdox.formulaeditor.parsing.expression.ExpressionContextParser.addFunction( 
      function(context) { return {

      // expression110 = gt | super.expression110
      expression110 : function() {
        var parent = arguments.callee.parent;
        pG.alternation(
          pG.rule("relation1gt"),
          parent.expression110).apply(this, arguments);
      },

      // relation1gt = 
      //    expression110 ">" expression120
      relation1gt :
        pG.transform(
          pG.concatenation(
            pG.rule("expression110"),
            pG.literal(">"),
            pG.rule("expression120")
          ),
          function(result) {
            return new semantics.Relation1Gt(result[0], result[2]);
          }
        )
      };
    });
  } else { // allow alternative as displayed on the screen
    org.mathdox.formulaeditor.parsing.expression.ExpressionContextParser.addFunction( 
      function(context) { return {

      // expression110 = relation1gt | 
      //   super.expression110
      expression110 : function() {
        var parent = arguments.callee.parent;
        pG.alternation(
          pG.rule("relation1gt"),
          parent.expression110).apply(this, arguments);
      },

      // relation1gt = 
      //    expression110 (">"|">") expression120
      relation1gt :
        pG.transform(
          pG.concatenation(
            pG.rule("expression110"),
	    pG.alternation(
	      pG.literal(">"),
	      pG.literal(">")
	    ),
            pG.rule("expression120")
          ),
          function(result) {
            return new semantics.Relation1Gt(result[0], result[2]);
          }
        )
      };
    });
  }
});
