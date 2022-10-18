/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
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
            log.debug('scriptcontext', scriptContext);
            try {

                var currentRecord1 = scriptContext.newRecord;
                var senderId = -5;
                var recipientId = runtime.getCurrentUser().email;
                if(scriptContext.type == 'create')
                {


                if  (currentRecord1.type == record.Type.CUSTOMER)
                {
                    log.debug("hi");
                    var entity1=currentRecord1.getValue({
                        fieldId:'entityid'
                    });
                    var type1=currentRecord1.getValue({
                        fieldId:'isperson'
                    });
                    var company1=currentRecord1.getValue({
                        fieldId:'companyname'
                    });
                    email.send({
                        author: senderId,
                        recipients: recipientId,
                        subject: 'Test Sample Email Module',
                        body: "customer record created" + "name" + company1 + "internalid" + entity1 + "type" + type1
                    });
                }
                if  (currentRecord1.type == record.Type.VENDOR)
                {
                    log.debug("hi");
                    var entity1=currentRecord1.getValue({
                        fieldId:'entityid'
                    });
                    var type1=currentRecord1.getValue({
                        fieldId:'isperson'
                    });
                    var company1=currentRecord1.getValue({
                        fieldId:'companyname'
                    });
                    email.send({
                        author: senderId,
                        recipients: recipientId,
                        subject: 'Test Sample Email Module',
                        body: "vendor record created" + "name" + company1 + "internalid" + entity1 + "type" + type1
                    });
                }
                if  (currentRecord1.type == record.Type.CONTACT)
                {
                    log.debug("hi");
                    var entity1=currentRecord1.getValue({
                        fieldId:'entityid'
                    });
                    var type1=currentRecord1.getValue({
                        fieldId:'isperson'
                    });
                    var company1=currentRecord1.getValue({
                        fieldId:'companyname'
                    });
                    email.send({
                        author: senderId,
                        recipients: recipientId,
                        subject: 'Test Sample Email Module',
                        body: "contact record created" + "name" + company1 + "internalid" + entity1 + "type" + type1
                    });
                }


            }
                if(scriptContext.type == 'delete')
                {


                    if  (currentRecord1.type == record.Type.CUSTOMER)
                    {
                        log.debug("hi");
                        var entity1=currentRecord1.getValue({
                            fieldId:'entityid'
                        });
                        var type1=currentRecord1.getValue({
                            fieldId:'isperson'
                        });
                        var company1=currentRecord1.getValue({
                            fieldId:'companyname'
                        });
                        email.send({
                            author: senderId,
                            recipients: recipientId,
                            subject: 'Test Sample Email Module',
                            body: "customer deleted" + "name" + company1 + "internalid" + entity1 + "type" + type1
                        });
                    }
                    if  (currentRecord1.type == record.Type.VENDOR)
                    {
                        log.debug("hi");
                        var entity1=currentRecord1.getValue({
                            fieldId:'entityid'
                        });
                        var type1=currentRecord1.getValue({
                            fieldId:'isperson'
                        });
                        var company1=currentRecord1.getValue({
                            fieldId:'companyname'
                        });
                        email.send({
                            author: senderId,
                            recipients: recipientId,
                            subject: 'Test Sample Email Module',
                            body: "vendor deleted" + "name" + company1 + "internalid" + entity1 + "type" + type1
                        });
                    }
                    if  (currentRecord1.type == record.Type.CONTACT)
                    {
                        log.debug("hi");
                        var entity1=currentRecord1.getValue({
                            fieldId:'entityid'
                        });
                        var type1=currentRecord1.getValue({
                            fieldId:'isperson'
                        });
                        var company1=currentRecord1.getValue({
                            fieldId:'companyname'
                        });
                        email.send({
                            author: senderId,
                            recipients: recipientId,
                            subject: 'Test Sample Email Module',
                            body: "contact deleted" + "name" + company1 + "internalid" + entity1 + "type" + type1
                        });
                    }
                }
            }

            catch(err)
            {
                log.debug('error@aftersubmit', err);
            }
        }
        return {beforeLoad, beforeSubmit, afterSubmit}

    });