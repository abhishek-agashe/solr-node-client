var http = require('http');    
    
    var ApacheSolrService = function(param) {
       this.solrOptions = {
            host : param.host,
            port : param.port,
            path : param.path
        };
    };

    ApacheSolrService.prototype.ping = function(ping_path,callback) {
        var path = (ping_path)? ping_path:'admin/ping?wt=json';
        this.solrResponse = false;
        this.makeRequest(path,function(err,data) {
           if(data.status == 'OK') {
                this.solrResponse = true;
           }
            callback(this.solrResponse);
        }.bind(this));
    };

    ApacheSolrService.prototype.makeRequest = function(query_path, callback) {
        var options = {
            host: this.solrOptions.host,
            port: this.solrOptions.port,
            path: this.solrOptions.path
        };
        if(query_path){
            options.path += query_path;
        }
        http.request(options, function(response) {
            var str = '';
            response.on('data',function(chunk){
                str += chunk;
            });
            response.on('end',function(){
                //console.log(str);
                var data = JSON.parse(str);
                callback(null, data); 
            });
        }).end();
        
    };
    
    ApacheSolrService.prototype.selectQuery = function(select_params, callback) {
        var key, count = 0, args = '',path = '';
        if(select_params) {
            Object.keys(select_params).forEach(function(key) {
                args += key + '=' + select_params[key];
                count ++;
                if(count < (Object.keys(select_params)).length) {
                    args += '&'
                }     
            });
              path = 'select?'+ args +'&wt=json';
        }
        this.makeRequest(path, function(err, response){
            callback(response);    
        });
    };
