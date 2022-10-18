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
    

    function validateField(scriptContext) {
        var record = scriptContext.currentRecord;

        var testing=record.getValue({
            fieldId:'custentity_sdr_apply_coupon'
        })

        if (testing==true) {
            if (context.fieldId == 'custentity_jj_coupon_code'){
                var validateCouponCode = record.getValue({
                    fieldId: 'custentity_jj_coupon_code'
                });
                var fieldLength = validateCouponCode.length;
                if(fieldLength!=5)
                {
                    alert("must 5 character");
                    return false;
                }
            }
            return true;
        }

    }


    return {

        validateField: validateField,

    };
    
});
