/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record'],

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
    function pageInit(scriptContext) {
        log.debug("hi");
        var record = scriptContext.currentRecord;
        var numlines=record.getLineCount({
            sublistId:'recmachcustrecord_sdr_prod_pref_customer'

        });
        log.debug(numlines);
        alert("count is"+numlines);
    }


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
    //function fieldChanged(scriptContext) {

   // }

    /**
     * Function to be executed when field is slaved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     *
     * @since 2015.2
     */
    //function postSourcing(scriptContext) {

    //}

    /**
     * Function to be executed after sublist is inserted, removed, or edited.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    //function sublistChanged(scriptContext) {

    //}

    /**
     * Function to be executed after line is selected.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    function lineInit(scriptContext) {
        var record = scriptContext.currentRecord;
        var recordquantity=record.getCurrentSublistValue({
            sublistId:'recmachcustrecord_sdr_prod_pref_customer',
            fieldId:'custrecord_sdr_prod_pref_qty'


        });
        if(isNaN(parseInt(recordquantity)))
        {
            record.setCurrentSublistValue({
                sublistId:'recmachcustrecord_sdr_prod_pref_customer',
                fieldId:'custrecord_sdr_prod_pref_qty',
                value:1

            });
        }



    }

    /**
     * Validation function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @returns {boolean} Return true if field is valid
     *
     * @since 2015.2
     */
   // function validateField(scriptContext) {

    //}

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
        var recordquantity=record.getCurrentSublistValue({
            sublistId:'recmachcustrecord_sdr_prod_pref_customer',
            fieldId:'custrecord_sdr_prod_pref_qty'


        });

        log.debug(recordquantity);

            if(recordquantity>10)
            {
                alert("not allow above 10");
                return false;
            }

        return true;

    }

    /**
     * Validation function to be executed when sublist line is inserted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    //function validateInsert(scriptContext) {

    //}

    /**
     * Validation function to be executed when record is deleted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    //function validateDelete(scriptContext) {

    //}

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
        var rec = scriptContext.currentRecord;
        var numlines=rec.getLineCount({
            sublistId:'recmachcustrecord_sdr_prod_pref_customer'
        });
        var item_name=new Array(numlines);
        var sum=0;
        for(var i=0;i<numlines;i++)
        {

                item_name[i] = rec.getSublistValue({
                    sublistId: 'recmachcustrecord_sdr_prod_pref_customer',
                    fieldId: 'custrecord_sdr_prod_pref_qty',

                    line: i,

                });
log.debug(item_name[i]);
                sum=sum+item_name[i];

        }
        log.debug(sum);

        if(sum>25)
        {
            alert("sum 25 is not allowed");
            return false;
        }
        return true;



    }

    return {
        pageInit: pageInit,
       // fieldChanged: fieldChanged,
       // postSourcing: postSourcing,
       // sublistChanged: sublistChanged,
        lineInit: lineInit,
      //  validateField: validateField,
       validateLine: validateLine,
    //    validateInsert: validateInsert,
    //    validateDelete: validateDelete,
        saveRecord: saveRecord
    };
    
});
