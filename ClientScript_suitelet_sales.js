/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope Public
 */

define(['N/search', 'N/currentRecord','N/record','N/url'], function(search,currentRecord,record,url) {
var record=currentRecord.get();
    function fieldChanged(scriptContext) {

        if(scriptContext.fieldId=='customer'){
            var cusvalue = scriptContext.currentRecord.getText("customer");
            console.log(cusvalue);
            var cusvalue_val = scriptContext.currentRecord.getValue("customer");
            console.log(cusvalue_val)


        }
        else{
            cusvalue_val=record.getValue("customer");
        }
        if(scriptContext.fieldId=='subsidiary'){
            var subvalue = scriptContext.currentRecord.getText("subsidiary");
             console.log(subvalue)
            var subvalue_val=scriptContext.currentRecord.getValue("subsidiary");
            console.log(subvalue_val);

        }
        else{
            subvalue_val=record.getValue("subsidiary");
        }



        if(scriptContext.fieldId=='statusname'){
            var statusvalue_val = scriptContext.currentRecord.getValue("statusname");
            console.log(statusvalue_val)

        }
        else{
            statusvalue_val=record.getValue("statusname");
        }


        if(scriptContext.fieldId=='department'){
            var departmentvalue=scriptContext.currentRecord.getText("department");
            console.log(departmentvalue)
            var departmentvalue_val = scriptContext.currentRecord.getValue("department");
            console.log(statusvalue_val)

        }
        else{
            departmentvalue_val=record.getValue("department")
        }
if(scriptContext.fieldId=='statusname' || scriptContext.fieldId=='department' || scriptContext.fieldId=='subsidiary' || scriptContext.fieldId=='customer' ){

    document.location = url.resolveScript({
        scriptId: 'customscript_jj_training_osalesorder',
        deploymentId: 'customdeploy_jj_training_salesorder',
        params: {
            'value_of_status': statusvalue_val,
            'text_of_customer': cusvalue,
            'value_of_customer':cusvalue_val,
            'value_of_subsidiary': subvalue_val,
            'value_of_department': departmentvalue_val,


        }
    });
}


    }









    return { fieldChanged : fieldChanged,

        };

});

