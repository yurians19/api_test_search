module.exports = {
    apps : [{
      name: "api_suppliers_search",
      script: "./index.js",
    //   error_file: './logs/pronto-mowers-api_err.log',
    //   out_file: './logs/pronto-mowers-api_out.log',
      combine_logs: false,
      merge_logs: false,
      time: true,  
      watch: true,
      exp_backoff_restart_delay: 100,
      env: {
        NODE_ENV: "development"
      }
    }]
  };