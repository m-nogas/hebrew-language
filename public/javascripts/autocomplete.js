// var LanguageDetect = require('../../node_modules/languagedetect');
// var lngDetector = new LanguageDetect();
// console.log(lngDetector.detect('This is a test.'));

function autocomplete(inp, arr) {
  var currentFocus;
  console.log(inp)
  inp.addEventListener("input", function(e) {
    var a, b, i, val = this.value;
    closeAllLists();
    if (!val) { 
      el = document.getElementsByTagName("myInput")
      el.dir = "ltr"
      return false;}
    else if (val.toString().match(/[\u0590-\u05FF]+/g)) {
      el = document.getElementById("myInput")
      el.dir = "rtl"
    }
    else if (val.toString().match(/[\u0000-\u007F]+/g)) {
      el = document.getElementById("myInput")
      el.dir = "ltr"
    }
    else if (val.toString().length() == 0) {
      el = document.getElementById("myInput")
      el.dir = "ltr"
    }
    currentFocus = -1;

    a = document.createElement("DIV");

    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);

    for (var letter in arr) {
      container = document.createElement("DIV")
      container.className = "container-fluid"
      // container.style = "width:100%"
      row = document.createElement("DIV")
      row.className = "row"
      row.classList.add("no-gutter")

      row.style = "top:100%;"
      row.classList.add("list-item")

      // container = document.createElement("container")

      var letter_info = arr[letter];
      var eng = letter_info["translation"]
      var trans = letter_info["transliteration"]
      if (letter.substr(0, val.length).toUpperCase() == val.toUpperCase() || 
          eng.substr(0, val.length).toUpperCase() == val.toUpperCase() ||
          trans.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        
        eng_col = document.createElement("col-sm-3")
        eng_col.classList.add("no-gutter")
        eng_col.classList.add("text-left")
        eng_col.classList.add("english-list-item")
        eng_col.style = "width:32%;"
        eng_col.dir = "ltr"

        trans_col = document.createElement("col-sm-3")
        trans_col.classList.add("no-gutter")
        trans_col.classList.add("text-center")
        trans_col.classList.add("transliteration-list-item")
        trans_col.style = "width:32%;"
        trans_col.dir = "ltr"

        heb_col = document.createElement("col-sm-3")
        heb_col.classList.add("no-gutter")
        heb_col.classList.add("text-right")
        heb_col.classList.add("hebrew-list-item")
        heb_col.style = "width:32%;"
        heb_col.dir = "rtl"

        heb_col.innerHTML = "<strongֿ class='hebrew-word'>" + letter.substr(0, val.length) + "</strong>";
        heb_col.innerHTML += letter.substr(val.length);
        heb_col.innerHTML += "<input type='hidden' value='" + letter + "'>";

        trans_col.innerHTML = "<strongֿ> [" + trans.substr(0, val.length) + "</strong>";
        trans_col.innerHTML += trans.substr(val.length) + "]";
        trans_col.innerHTML += "<input type='hidden' value='" + trans + "'>";

        eng_col.innerHTML = "<strongֿ>" + eng.substr(0, val.length) + "</strong>";
        eng_col.innerHTML += eng.substr(val.length);
        eng_col.innerHTML += "<input type='hidden' value='" + eng + "'>";

        row.appendChild(eng_col)
        row.appendChild(trans_col)
        row.appendChild(heb_col)

        container.appendChild(row)
        a.appendChild(container)

        // a.appendChild(eng_col)
        // a.appendChild(trans_col)
        // a.appendChild(heb_col)

      }
    }
  });
  inp.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } 
    else if (e.keyCode == 38) { //up
      currentFocus--;
      addActive(x);
    } 
    else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
var words = {
  "שלום":{"translation": "hello; goodbye; peace", "transliteration": "shalom"}, 
  "ספר": {"translation": "book", "transliteration": "sefer"},
  "דג": {"translation": "fish", "transliteration": "dag"},
  "גנב": {"translation": "thief", "transliteration": "ganav"},
  "בגד": {"translation": "cloth", "transliteration": "beged"},
  "גן": {"translation": "garden", "transliteration": "gan"},
  "בן": {"translation": "son; boy", "transliteration": "ben"},
  "בון": {"translation": "gardener", "transliteration": "ganan"},
  "אוי": {"translation": "I; me", "transliteration": "ani"},
  "אתה": {"translation": "you", "gender":"masculine", "plurality":"singular", "transliteration": "ata"},
  "את": {"translation": "you", "gender":"feminine", "plurality":"singular", "transliteration": "at"},
  "אתם": {"translation": "you", "gender":"masculine", "plurality":"plural or mixed", "transliteration": "atem"},
  "אתן": {"translation": "you", "gender":"feminine", "plurality":"plural", "transliteration": "aten"},
  "אתן": {"translation": "you", "gender":"feminine", "plurality":"plural", "transliteration": "aten"},
  "ב.ג.ד": {"translation": "cheat; betray", "gender":"root", "plurality":"root", "transliteration": "(b.g.d)"},
  "בוגד": {"translation": "cheat; betray", "gender":"masculine", "plurality":"singular", "transliteration": "boged"},
  "בוגדת": {"translation": "cheat; betray", "gender":"feminine", "plurality":"singular", "transliteration": "bogedet"},
  "בוגדים": {"translation": "cheat; betray", "gender":"masculine", "plurality":"plural", "transliteration": "bogdim"},
  "בוגדות": {"translation": "cheat; betray", "gender":"feminine", "plurality":"plural", "transliteration": "bogdot"},
  "ג.נ.ב": {"translation": "steal", "gender":"root", "plurality":"root", "transliteration": "(g.n.v)"},
  "א.ה.ב": {"translation": "love; like", "gender":"root", "plurality":"root", "transliteration": "(!.h.v)"},
  "אהבה": {"translation": "love", "type":"noun", "gender":"root", "plurality":"root", "transliteration": "ahava", },
  "מה": {"translation": "what", "type":"", "gender":"", "plurality":"", "transliteration": "ma", },

}
var countries = ["שלום", "ספר", "Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
autocomplete(document.getElementById("myInput"), words);




