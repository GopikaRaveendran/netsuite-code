/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord','N/record'],
/**
 * @param{currentRecord} currentRecord
 */
function(currentRecord,record) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    /**function pageInit(scriptContext) {
        /**  // log.debug('test',scriptcontext.mode);
       if(scriptContext.mode == "create")
        {
           var currentRecord1 = scriptContext.currentRecord;
            var testing = currentRecord1.getValue({
                fieldId:'custbody_jj_memo_otp865'


            })
            if(testing == 'T')
            {
                currentRecord1.setValue({
                    fieldId:'memo',
                    value:'Testing Completed'
                })
            }
            else
            {
                currentRecord1.setValue({
                    fieldId:'memo',
                    value:'Testing not Completed'
                })
            }

        }


    }  **/

    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @since 2015.2
     */
   /** function fieldChanged(scriptContext) {

      /**      var currentRecord11 = scriptContext.currentRecord;
            var testing = currentRecord11.getValue({
                fieldId: 'custbody_jj_memo_otp865'


            })
           log.debug(testing);
         if (testing == true) {
                currentRecord11.setValue({
                    fieldId: 'custbody_jj_passedorfailed_otp865',
                    value: 'Passed'
                })
            }



    } **/



    /**
     * Validation function to be executed when sublist line is committed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateLine(scriptContext) {
        var record = scriptContext.currentRecord;
        var recordamount=record.getCurrentSublistValue({
            sublistId:'item',
            fieldId:'amount'

        });
        console.log(recordamount);
if(recordamount<200)
{
    alert("not allow");
    return false;
}
return true;


    }






















    var customer = form.addField({
        id: 'custpage_location',
        type: serverWidget.FieldType.SELECT,
        label: 'customer',
        source: 'customer'
    });

    var subsidiary = form.addField({
        id: 'custpage_vendor',
        type: serverWidget.FieldType.SELECT,
        label: 'subsidiary',
        source: 'subsidiary'
    });
    var statusname = form.addField({
        id: 'statusfield',
        type: serverWidget.FieldType.SELECT,
        label: 'Status',

    });

    statusname.addSelectOption({text: 'Billed', value: 'Billed'});



    return {

        validateLine: validateLine,


    };
    
});
