/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */
define(['N/email', 'N/file', 'N/record', 'N/runtime', 'N/search'],
    /**
     * @param{email} email
     * @param{file} file
     * @param{record} record
     * @param{runtime} runtime
     * @param{search} search
     */
    (email, file, record, runtime, search) => {
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
            return search.load({id:'customsearch_jj_training_sales_month'});

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
            log.debug("hello");


            var searchResult = JSON.parse(mapContext.value);
            var salesreppass=searchResult.values["custbody_jj_training_salesrep"];
            if(salesreppass){
                var arrayname=[];

                arrayname.push(searchResult.values["entity"])
                arrayname.push(searchResult.values["tranid"])
                arrayname.push(searchResult.values["amount"])
                arrayname.push(searchResult.values["custbody_jj_training_cust_email"])
                log.debug({
                    title:'array name',
                    details:arrayname
                });
                mapContext.write({
                    key:salesreppass ,
                    value: arrayname
                });
            }else{
                var arrayname1=[];
                arrayname1.push(searchResult.values["entity"])
                arrayname1.push(searchResult.values["tranid"])
                arrayname1.push(searchResult.values["custbody_jj_training_cust_email"])
                log.debug({
                    title:'array name',
                    details:arrayname1
                });
                var adminid=-5;
                mapContext.write({
                    key:adminid ,
                    value: arrayname1
                });

            }




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
            var salesrep_email = reduceContext.key;
            var testvalue=reduceContext.values
            log.debug({
                title:'salesrep_email',
                details:salesrep_email
            });
            log.debug({
                title:'testvalue',
                details:testvalue
            });
            var lengthvalue=testvalue.length;
            log.debug({
                title:'lengthvalue',
                details:lengthvalue
            });
            var csv='\n';
            log.debug("test");

            for(var i=0;i<reduceContext.values.length;i++) {
                var salesorder = JSON.parse(reduceContext.values[i])
                log.debug({
                    title: 'salesorder',
                    details: salesorder
                });



                for (var k=0;k < salesorder.length;k++) {

                    csv=csv+salesorder[k];
                    csv=csv+","

                }
                csv=csv+"\n"
                var fileobj=file.create({
                    name:'salesordersalesrep.csv',
                    fileType:file.Type.CSV,
                    contents:csv,
                    folder:'664'
                });
               fileobj.save();
                log.debug(csv);
                if(salesrep_email==-5)
                {
                    email.send({
                        author:-5,
                        recipients:salesrep_email,
                        subject:"Add salesRep",
                        body:"add Sales Rep for the corresponding customers",

                    });
                }else{
                    email.send({
                        author:-5,
                        recipients:salesrep_email,
                        subject:"Sales information",
                        body:"customer sales information of the previous month",
                        attachments:[fileobj]
                    });
                }

            }



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

        }

        return {getInputData, map, reduce, summarize}

    });

