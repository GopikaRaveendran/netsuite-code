/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record'],
    /**
     * @param{record} record
     */
    function(record) {
        /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */


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
    function fieldChanged(scriptContext) {
        /**if (scriptContext.mode == "create") {
            var currentRecord1 = scriptContext.currentRecord;
            var testing = currentRecord1.getValue({
                fieldId: 'custentity_sdr_apply_coupon'


            });
            if (testing == 'T') {
                currentRecord1.setValue({
                    fieldId: 'custentity_jj_coupon_code',
                    isDisabled : false;
                })
            } else {
                currentRecord1.setValue({
                    fieldId: 'custentity_jj_coupon_code',
                    isDisabled : true;

                })
            }


        } **/

        var record = scriptContext.currentRecord;




        var testing=record.getValue({
            fieldId:'custentity_sdr_apply_coupon'
        })
        var test1=record.getField({
            fieldId:'custentity_jj_coupon_code'
        })

        if (testing==true) {

            test1.isDisabled = false;
        } else {
            test1.isDisabled = true;





        }

    }



    return {

        fieldChanged: fieldChanged,

    };
    
});
