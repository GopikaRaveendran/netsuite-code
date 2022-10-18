/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */
define(['N/email', 'N/search', 'N/record'],
    /**
     * @param{email} email
     * @param{search} search
     */
    (email, search,record) => {
            /**
             * Defines the function that is executed at the beginning of the map/reduce process and generates the input data.
             * @param {Object} inputContext
             * @param {boolean} inputContext.isRestarted - Indicates whether the current invocation of this function is the first
             *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
             * @param {Object} inputContext.ObjectRef - Object that references the input data
             * @typedef {Object} ObjectRef
             * @property {string|number} ObjectRef.id - Internal ID of the record instance that contains the input data
             * @property {string} ObjectRef.type - Type of the record instance that contains the input data
             * @returns {Array|Object|Search|ObjectRef|File|Query} The input data to use in the map/reduce process
             * @since 2015.2
             */
            const getInputData = (inputContext) => {
                    return search.create({
                            type: record.Type.SALES_ORDER,
                            filters: ['status', 'is', 'SalesOrd:A'],
                            columns: ['tranid'],
                            title: 'Pending Approval sales order'
                    });
            }


            /**
             * Defines the function that is executed when the map entry point is triggered. This entry point is triggered automatically
             * when the associated getInputData stage is complete. This function is applied to each key-value pair in the provided
             * context.
             * @param {Object} mapContext - Data collection containing the key-value pairs to process in the map stage. This parameter
             *     is provided automatically based on the results of the getInputData stage.
             * @param {Iterator} mapContext.errors - Serialized errors that were thrown during previous attempts to execute the map
             *     function on the current key-value pair
             * @param {number} mapContext.executionNo - Number of times the map function has been executed on the current key-value
             *     pair
             * @param {boolean} mapContext.isRestarted - Indicates whether the current invocation of this function is the first
             *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
             * @param {string} mapContext.key - Key to be processed during the map stage
             * @param {string} mapContext.value - Value to be processed during the map stage
             * @since 2015.2
             */
            const map = (mapContext) => {
                    var searchResult = JSON.parse(mapContext.value);
                    var SalesId = searchResult.id;
                    log.debug(SalesId)

                    mapContext.write({
                            key: SalesId,
                            //value: SalesId
                    });
            }
            /**
             * Defines the function that is executed when the reduce entry point is triggered. This entry point is triggered
             * automatically when the associated map stage is complete. This function is applied to each group in the provided context.
             * @param {Object} reduceContext - Data collection containing the groups to process in the reduce stage. This parameter is
             *     provided automatically based on the results of the map stage.
             * @param {Iterator} reduceContext.errors - Serialized errors that were thrown during previous attempts to execute the
             *     reduce function on the current group
             * @param {number} reduceContext.executionNo - Number of times the reduce function has been executed on the current group
             * @param {boolean} reduceContext.isRestarted - Indicates whether the current invocation of this function is the first
             *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
             * @param {string} reduceContext.key - Key to be processed during the reduce stage
             * @param {List<String>} reduceContext.values - All values associated with a unique key that was passed to the reduce stage
             *     for processing
             * @since 2015.2
             */
            const reduce = (reduceContext) => {
                    var salesorderid = reduceContext.key;







                    var salesorder = record.load({
                            type: record.Type.SALES_ORDER,
                            id: salesorderid,
                            isDynamic: true
                    });
                    salesorder.setText({
                            fieldId:'orderstatus',
                            text:'Pending Fulfillment'
                    });
                    log.debug(salesorderid + ' has been updated with Pending Fulfillment status');
                    salesorder.save();







                    reduceContext.write
                    ({
                            key:salesorderid,

                    });
            }
            /**
             * Defines the function that is executed when the summarize entry point is triggered. This entry point is triggered
             * automatically when the associated reduce stage is complete. This function is applied to the entire result set.
             * @param {Object} summaryContext - Statistics about the execution of a map/reduce script
             * @param {number} summaryContext.concurrency - Maximum concurrency number when executing parallel tasks for the map/reduce
             *     script
             * @param {Date} summaryContext.dateCreated - The date and time when the map/reduce script began running
             * @param {boolean} summaryContext.isRestarted - Indicates whether the current invocation of this function is the first
             *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
             * @param {Iterator} summaryContext.output - Serialized keys and values that were saved as output during the reduce stage
             * @param {number} summaryContext.seconds - Total seconds elapsed when running the map/reduce script
             * @param {number} summaryContext.usage - Total number of governance usage units consumed when running the map/reduce
             *     script
             * @param {number} summaryContext.yields - Total number of yields when running the map/reduce script
             * @param {Object} summaryContext.inputSummary - Statistics about the input stage
             * @param {Object} summaryContext.mapSummary - Statistics about the map stage
             * @param {Object} summaryContext.reduceSummary - Statistics about the reduce stage
             * @since 2015.2
             */
            const summarize = (summaryContext) => {
                    summaryContext.output.iterator().each(function (key, value) {
                            var salesorder1 = record.load({
                                    type: record.Type.SALES_ORDER,
                                    id: key,

                                    isDynamic: true
                            });


                            var email1=salesorder1.getValue({
                                    fieldId:'entity',

                            });











                            email.send({
                                    author: -5,
                                    recipients:email1,           //email1
                                    subject: 'updated',

                                    body: key + 'is updated with status Pending Fulfillment',
                                        //key + 'is updated with status Pending Fulfillment',
                            });
                    });
            }
            return {getInputData, map, reduce, summarize}

    });