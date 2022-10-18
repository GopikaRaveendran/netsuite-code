/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/search'],
    /**
 * @param{task} task
 */
    (search) => {


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
            var search_salesorder = search.lookupFields({
                type: search.Type.CUSTOMER,
                id:test_customer,
                columns:
                    ['email']


            });
            var testing=search_salesorder['email'];
            email.send({
                author:testing,
                recipients: -5,
                subject: 'NEW Test Sample Email Module',
                body: "New Custom Record form with name "
            });
        }

        return { afterSubmit}

    });
