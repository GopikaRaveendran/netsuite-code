/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/search','N/record','N/email','N/runtime','N/log'],
    
    (search,record,email,runtime,log) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {
            log.debug("hi");

            var searchId =
            runtime.getCurrentScript().getParameter("custscriptscheduled_script");
            log.debug({
                title:'My sales orders',
                details:searchId
            });
           try {
               search.load({
                   id: searchId,

               }).run().each(function(result) {

                   log.debug({
                       title:'function sales order',
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
                        fulfillmentRecord.setSublistValue('item', 'location', i, 1);
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
