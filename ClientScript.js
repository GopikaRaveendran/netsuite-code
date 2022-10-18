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
    //var record = currentRecord.get();
    function fieldChanged(scriptContext) {
        if(scriptContext.fieldId == 'statusfield' && scriptContext.fieldId == 'customerfield' && scriptContext.fieldId == 'subsidiaryfield' ) {
            var status = record.getValue('statusfield');
            log.debug(status);
            var customer = record.getValue('customerfield');
            log.debug(customer);
            var subsidiary = record.getValue('subsidiaryfield');

            let sublist = form.addSublist({
                id: 'sublist',
                type: serverWidget.SublistType.INLINEEDITOR,
                label: 'SalesOrder Details',

            });
       /**     sublist.addField({
                id: 'sublist1',
                type: serverWidget.FieldType.TEXT,
                label: 'Subsidiary',

            });
            sublist.addField({
                id: 'sublist2',
                type: serverWidget.FieldType.TEXT,
                label: 'Internal ID',

            });
            sublist.addField({
                id: 'sublist3',
                type: serverWidget.FieldType.TEXT,
                label: 'Date',

            });
            sublist.addField({
                id: 'sublist4',
                type: serverWidget.FieldType.TEXT,
                label: 'Customer Name',

            });

            sublist.addField({
                id: 'sublist5',
                type: serverWidget.FieldType.TEXT,
                label: 'Document Name',

            });
            sublist.addField({
                id: 'sublist6',
                type: serverWidget.FieldType.TEXT,
                label: 'Status',

            });  **/










            var search_salesorder = search.create({
                type: search.Type.SALES_ORDER,
                id: 'search_order',
                columns:
                    ['subsidiary', 'internalid', 'trandate', 'entity', 'tranid', 'status'],
                filters: [['mainline', 'is', 'T'] ,'and', ['status','is',status],'and',['entity','is',customer],'and',['subsidiary','is',subsidiary]]
            });

            var resultsearch = search_salesorder.run().getRange({
                start: 0,
                end: 100
            });


            for (var i = 0; i < resultsearch.length; i++) {
                var subsidiary = resultsearch[i].getText({
                    name: 'subsidiary',

                });
                sublist.setSublistValue({
                    id: 'sublist1',
                    line: i,//i,
                    value: subsidiary
                });

                var internalid = resultsearch[i].getText({
                    name: 'internalid'
                });
                sublist.setSublistValue({
                    id: 'sublist2',
                    line: i,//i,
                    value: internalid
                });

                var trandate = resultsearch[i].getValue({
                    name: 'trandate'
                });
                sublist.setSublistValue({
                    id: 'sublist3',
                    line: i,//i,
                    value: trandate
                });

                var entity = resultsearch[i].getText({
                    name: 'entity'
                });

                sublist.setSublistValue({
                    id: 'sublist4',
                    line: i,//i,
                    value: entity
                });

                var document = resultsearch[i].getValue({
                    name: 'tranid'
                });

                sublist.setSublistValue({
                    id: 'sublist5',
                    line: i,//i,
                    value: document
                });
                var status = resultsearch[i].getText({
                    name: 'status'
                });

                sublist.setSublistValue({
                    id: 'sublist6',
                    line: i,//i,
                    value: status
                });

            }

        }




    }



    return {

        fieldChanged: fieldChanged,

    };
    
});
