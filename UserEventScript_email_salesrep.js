/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/record', 'N/runtime'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{runtime} runtime
 */
    (email, record, runtime) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {
            var currentRecord1 = scriptContext.newRecord;
            var senderId = runtime.getCurrentUser().id;
            log.debug(senderId);


            var recipientIdvalue = currentRecord1.getValue({
                fieldId: 'email'
            });
            log.debug(recipientIdvalue);
            if (scriptContext.type == 'create') {
                email.send({
                    author: senderId,
                    recipients: recipientIdvalue,
                    subject: 'Test Sample Email Module',
                    body: "test email body"
                });


            }
        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
