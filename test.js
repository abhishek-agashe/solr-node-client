(function() {
    var solr = new ApacheSolrService({'host':'localhost','port':'8983','path':'/solr/'});
    solr.ping('',function(result){
        execute(solr);
    });
})();
    
function execute(solr) {
    solr.selectQuery({'q':'*.*','rows':2},function(result){
        console.log(result.response);
    });
}