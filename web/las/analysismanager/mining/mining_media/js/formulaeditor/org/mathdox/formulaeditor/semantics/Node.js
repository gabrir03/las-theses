$package("org.mathdox.formulaeditor.semantics");

$identify("org/mathdox/formulaeditor/semantics/Node.js");


$main(function(){

  /**
   * Representation of a node in the semantic tree.
   */
  org.mathdox.formulaeditor.semantics.Node = $extend(Object, {

      /**
       * expected number of arguments
       * "null" means no information
       */
      argcount : null,

      /**
       * checkArguments: check the number of arguments, returns true or an error string
       */
      checkArguments : function(operands) {
        var argcount;
        
        if (operands === null || operands === undefined) {
          argcount = 0;
        } else {
          argcount = operands.length;
        }

        if (this.argcount === null) {
          return true;
        } else if (this.argcount == argcount) {
          return true;
        } else {
          return "expecting "+this.argcount+" argument(s), but found "+argcount+" argument(s) instead";
        }
      },

    /**
     * Returns the presentation tree node that is used to draw this semantic
     * tree node on a canvas. This is an abstract method, so it is expected that
     * subclasses will override this method.
     *
     * context: object that can contain information that might influence the
     * presentation of child objects. context cascades; it is either the same,
     * or copied and then extended or modified.
     */
    getPresentation : function(context) {
      throw new Error("abstract method called");
    },

    /**
     * Returns the OpenMath representation of the node. This is an abstract
     * method, so it is expected that subclasses will override this method.
     */
    getOpenMath : function() {
      throw new Error("abstract method called");
    },

    /**
     * Returns the MathML presentation of the node. This is an abstract method,
     * so it is expected that subclasses will override this method.
     */
    getMathML : function() {
      throw new Error("abstract method called");
    },

    /**
     * get the value as a string, useful when multiple internal representations are possible
     */
    getValueAsString : function() {
      return this.value.toString();
    }

  });

});
