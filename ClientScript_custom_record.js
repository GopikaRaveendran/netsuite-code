/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define([],

function() {
    



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


       record.load({})
        var recordexternal=record.getCurrentSublistValue({
            sublistId:'recmachcustsublistcustomscript_jj_training_cust',
            fieldId:'custrecord2'


        });
        log.debug(recordexternal);
        var recordcontainer=record.getCurrentSublistValue({
            sublistId:'recmachcustsublistcustomscript_jj_training_cust',
            fieldId:'custrecord_jj_training_container'


        });
        log.debug(recordcontainer);
    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged,
        postSourcing: postSourcing,
        sublistChanged: sublistChanged,
        lineInit: lineInit,
        validateField: validateField,
        validateLine: validateLine,
        validateInsert: validateInsert,
        validateDelete: validateDelete,
        saveRecord: saveRecord
    };
    
});
