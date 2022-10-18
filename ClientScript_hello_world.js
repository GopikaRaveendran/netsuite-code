/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope Public
 */

define(['N/search', 'N/currentRecord'], function(search,currentRecord) {
    //   var record = currentRecord.get();
    function pageInit(scriptContext) {
        alert("pageinit");
}
function setValTestFunc(){
        var rec=currentRecord.get()
    rec.setValue({
        fieldId:'custpage_text',
        value:'this from cs'
    });
};
   /** function fieldChanged(context) {
     alert("hello file changed");

    } **/

    return { pageInit : pageInit,
        setValTestFunc:setValTestFunc};

});