/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record'],

    (record) => {

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
                log.debug('scriptcontext',scriptContext);


                if (scriptContext.type == scriptContext.UserEventType.EDIT) {
                    var currentRecord1 = scriptContext.newRecord;

                    if(currentRecord1.type == record.Type.SALES_ORDER) {
                        var testing = currentRecord1.getValue({
                            fieldId: 'entity'
                        });
                        log.debug('testing', testing);

                        var rec = record.load({
                            type: record.Type.CUSTOMER,
                            id: testing
                        });

                        rec.setValue({
                            fieldId: 'custentity_jj_training_check',
                            value: true
                        });
                        var recordId = rec.save()
                    }



                    if (currentRecord1.type == record.Type.PURCHASE_ORDER) {
                        var vendor = currentRecord1.getValue({
                            fieldId: 'entity'
                        });
                        log.debug('vendortesting', vendor);


                        var rec1 = record.load({
                            type: record.Type.VENDOR,
                            id: vendor
                        });
                        rec1.setValue({
                            fieldId: 'custentity_jj_training_check',
                            value: true
                        });
                        var recordId1 = rec1.save()
                    }

                }
            } catch (err) {
                log.error('error@aftersubmit', err);
            }


        }


        return {afterSubmit}

    });
