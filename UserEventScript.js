/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/runtime'],
    /**
 * @param{email} email
 * @param{runtime} runtime
 */
    (email, runtime) => {
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
            try {
                log.debug('scriptcontext', scriptContext);
                var currentRecord1 = scriptContext.newRecord;
                var senderId = -5;



                var recipientId = runtime.getCurrentUser().email;

                if (currentRecord1.type == record.Type.CUSTOMER && (scriptContext.type == 'create' ||scriptContext.type == 'delete' ))
                {
                    var type1=currentRecord1.getValue({
                        fieldId:'entityid'
                    });
                    var entity1=currentRecord1.getValue({
                        fieldId:'isperson'
                    });
                    var entity1=currentRecord1.getValue({
                        fieldId:'companyname'
                    });





                    email.send({
                        author: senderId,
                        recipients: recipientId,
                        subject: 'Test Sample Email Module',
                        body: 'email body',


                    });
                }



            } catch (err) {
                log.error('error@aftersubmit', err);
            }


            return {beforeLoad, beforeSubmit, afterSubmit}

        }


    });
