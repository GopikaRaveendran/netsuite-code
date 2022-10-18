/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/record','N/search'],

    function(currentRecord, record,search){


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
        function postSourcing(scriptContext) {
            var currentRecord = scriptContext.currentRecord;
            var getitem = currentRecord.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'item'
            });
            console.log(getitem);
         var itemload = search.lookupFields({
                type: record.Type.INVENTORY_ITEM,
                id: getitem,
             columns:['custitem_jj_training_length','custitem_jj_training_breadth','custitem_jj_training_height']

            });

            console.log(itemload['custitem_jj_training_length'])
            console.log(itemload['custitem_jj_training_breadth'])
            console.log(itemload['custitem_jj_training_height'])
var length=itemload['custitem_jj_training_length'];
 var breadth=itemload['custitem_jj_training_breadth'];
 var height=itemload['custitem_jj_training_height'];

 var lengthbreadth=length * breadth;

 console.log(lengthbreadth);

            currentRecord.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'custcol_jj_training_containerbox',
                value: lengthbreadth

            });

            var rate = currentRecord.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'rate'
            });
            console.log(`the rate is ${rate}`)
            var amount = rate * lengthbreadth * height;
            console.log(`the amount is ${amount}`)
            currentRecord.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'amount',
                value: amount
            });

            console.log('end')



        }
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
       /** function validateLine(scriptContext) {
            var currentRecord = scriptContext.currentRecord;

            var rate1 = currentRecord.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'rate'
            });
            var container = currentRecord.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'custcol_jj_training_containerbox'
            });
            var amountpost = currentRecord.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'amount'
            });
            var currentRecord = scriptContext.currentRecord;
            var getitem = currentRecord.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'item'
            });
            var itemload = record.load({
                type: record.Type.INVENTORY_ITEM,
                id: getitem,
                isDynamic: true
            });

            var height = itemRec.getValue({
                fieldId: 'custitem_jj_training_height'
            });
             var amountvalidate=rate1*container*height;
             if(amountpost != amountvalidate){
                 alert("error");
                 return false;
             }
             return true;

        }  **/


        return {

            postSourcing: postSourcing,
           // validateLine:validateLine

        };

    });
