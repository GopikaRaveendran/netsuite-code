/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/search','N/record','N/email','N/runtime'],

    (search,record,email,runtime) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {
            var resultCustomer=search.create({
                type:search.Type.SALES_ORDER,
                id:'custscript_searchid',
                columns:[{name:'entity'},{name:'trandate'}],
                filters:[{name:'mainline',operator:'is',values:['F']},{name:'trandate',operator:'on',values:'7/10/2022'},],



            }).run().getRange({
                start:0,
                end:100
            });


            log.debug({
                title:'My sales orders',
                details:resultCustomer
            });



            log.debug("created");















            if (scriptContext.type !== scriptContext.InvocationType.ON_DEMAND)
                return;
            var searchId = runtime.getCurrentScript().getParameter("custscript_searchid");
            try {
                search.load({
                    id: searchId
                }).run().each(function(result) {
                    log.debug({
                        details: 'transforming so :' + result.id + ' to item fulfillment'
                    });
                    var fulfillmentRecord = record.transform({
                        fromType: record.Type.SALES_ORDER,
                        fromId: result.id,
                        toType: record.Type.ITEM_FULFILLMENT,
                        isDynamic: false
                    });
                    var lineCount = fulfillmentRecord.getLineCount('item');
                    for (var i = 0; i < lineCount; i++) {
                        fulfillmentRecord.setSublistValue('item', i);
                    }
                    var fulfillmentId = fulfillmentRecord.save();
                    var so = record.load({
                        type: record.Type.SALES_ORDER,
                        id: result.id
                    });
                    so.setValue('memo', fulfillmentId);
                    so.save();
                    return true;
                });
            } catch (e) {
                var subject = 'Fatal Error: Unable to transform salesorder to item fulfillment!';
                var authorId = -5;
                var recipientEmail = -5;
                email.send({
                    author: authorId,
                    recipients: recipientEmail,
                    subject: subject,
                    body: 'Fatal error occurred in script: ' + runtime.getCurrentScript().id + '\n\n' + JSON.stringify(e)
                });
            }
        }








        return {execute}

    });
