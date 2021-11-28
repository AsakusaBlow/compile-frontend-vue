// https://www.webprofessional.jp/fetching-data-third-party-api-vue-axios/


// const CompileApiBaseUrl = "http://compi-Publi-168H5W6RSHLVS-1734427507.ap-northeast-1.elb.amazonaws.com/book?tag=Python&limit=20&orderBy=review_average&order=desc";
const CompileApiBaseUrl = "http://compi-Publi-168H5W6RSHLVS-1734427507.ap-northeast-1.elb.amazonaws.com/book";
// const CompileApiBaseUrl = "http://localhost:8080/book?orderBy=review_average&order=desc";

const TAGS = "python,統計,時系列,機械学習,AWS,GCP,Azure,AI,人工知能,深層学習,ディープラーニング,データクレンジング,データサイエンス,可視化,データ分析,ビッグデータ,Vue,React,Go,IoT,プログラミング,レコメンド"

function buildUrl(tag) {
  if (tag.length > 0){
    return CompileApiBaseUrl + "?tag=" + tag + "&limit=20&orderBy=review_average&order=desc"
  } else{
    return CompileApiBaseUrl + "?limit=20&orderBy=review_average&order=desc"
  }
}

const vm = new Vue({
  el: '#app',
  data: {
    results: [],
    tags: TAGS.split(','),
    tag: ''
  },
  mounted(){
    this.getBooks(this.tag);
  },
  methods: {
    getBooks(tag) {
      let url = buildUrl(tag);
      axios.get(url).then((response) => {
        this.results = response.data.books;
      }).catch( error => { console.log(error); });
    }
  },
  computed: {
    processedBooks(){
      let books = this.results;
  
      // Put Array into Chunks
      let i,j, chunkedArray = [], chunk = 4;
      for (i=0, j=0; i<books.length; i+= chunk, j++){
        chunkedArray[j] = books.slice(i, i+chunk)
      }
      return chunkedArray
    }
  }
});