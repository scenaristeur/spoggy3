/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/*
Module pour attrapper les parametres d'url :
//http://127.0.0.1:8081/?endpoint=http://127.0.0.1:3030&source=http://test.json&graph=plop&query=SELECT * WHERE {?s ?p ?o}

*/

import { LitElement, html } from '@polymer/lit-element';

// These are the elements needed by this element.
import { plusIcon, minusIcon } from './../my-icons.js';

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './../button-shared-styles.js';
import  'evejs/dist/eve.min.js';
import { CatchurlAgent } from './agents/CatchurlAgent.js'
// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class SpoggyCatchurl extends LitElement {
  _render(props) {
    return html`
    ${ButtonSharedStyles}
    <style>
    span { width: 20px; display: inline-block; text-align: center; font-weight: bold;}
    </style>
    <div>
    <p>
    CATCH URL </br>
    Params are <br>
    Endpoint : ${props.endpoint}</br>
    Query : ${props.query}</br>
    Graph : ${props.graph}</br>
    Source : ${props.source}</br>
    </p>
    <p>test : http://127.0.0.1:8081/?endpoint=http://127.0.0.1:3030&source=http://test.json&graph=plop&query=SELECT * WHERE {?s ?p ?o}</p>
    </div>
    `;
  }

  static get properties() { return {
    params: Object,
    endpoint: String,
    query: String,
    graph: String,
    source: String
  }};

  constructor() {
    super();
  }
  _firstRendered() {
    //  console.log("eve",eve);
    this.agentCatchurl = new CatchurlAgent('agentCatchurl', this);
    //  console.log(this.agentCatchurl);
    this.agentCatchurl.send('agentApp', {type: 'dispo', name: 'agentCatchurl' });
    console.log("catchurl");
    this.params = this.recupParams();

    if (this.params.hasOwnProperty("endpoint") && this.params.endpoint != undefined && this.params.endpoint.length > 0){
      this.endpoint = this.params.endpoint;
      console.log('Connexion au endpoint ', this.endpoint);
    }
    if (this.params.hasOwnProperty("query") && this.params.query != undefined && this.params.query.length > 0){
      this.query = this.params.query;
      console.log('Execution de la requete ', this.query);
    }
    if (this.params.hasOwnProperty("graph") && this.params.graph != undefined && this.params.graph.length > 0){
      this.graph = this.params.graph;
      console.log('Mode Collaboratif connexion au graphe', this.graph);
    }
    if (this.params.hasOwnProperty("source") && this.params.source != undefined && this.params.source.length > 0){
      this.source  = this.params.source;
      console.log('Import & Chargement du fichier source', this.source);
    }
  }



  recupParams(){
    var params = (function(a) {
      if (a == "") return {};
      var b = {};
      for (var i = 0; i < a.length; ++i)
      {        var p=a[i].split('=', 2);
      if (p.length == 1)
      b[p[0]] = "";
      else
      b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
  })(window.location.search.substr(1).split('&'));
  return params;
}

}

window.customElements.define('spoggy-catchurl', SpoggyCatchurl);
