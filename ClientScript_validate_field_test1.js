/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define([],

function() {
    


    /**
     * Validation function to be executed when record is saved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @returns {boolean} Return true if record is valid
     *
     * @since 2015.2
     */
    function saveRecord(scriptContext) {
        var record = scriptContext.currentRecord;

        var testing=record.getValue({
            fieldId:'custentity_sdr_apply_coupon'
        })

        if (testing==true) {
            //if (scriptContext.fieldId == 'custentity_jj_coupon_code'){
                var validateCouponCode = record.getValue({
                    fieldId: 'custentity_jj_coupon_code'
                });
                var fieldLength = validateCouponCode.length;
                if(fieldLength!=5)
                {
                    alert("must 5 character");
                    return false;
                }

           // }
            return true;
        }


    }

    return {

        saveRecord: saveRecord
    };
    
});
