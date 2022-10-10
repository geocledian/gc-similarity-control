/*
 Vue.js Geocledian similarity component
 created: 2022-09-21, jsommer
 updated: 2022-10-10, jsommer
 version: 0.1
*/
"use strict";

//language strings
const gcSimilarityLocales = {
  "en": {
    "options": { "title": "Similarity options", "date_format_hint": "YYYY-MM-DD"  },
    "similarity": {
      "settings": "Options",
      "radius": "Search radius [m]",
      "number_of_references": "Nb of references",
      "interval_days": "Interval [days]",
      "startdate": "Start date",
      "enddate": "End date",
      "crop": "Crop",
      "entity": "Entity",
      "verification": "Verification",
      "getSimilarity": "Get similarity"
    },
  },
  "de": {
    "options": { "title": "Ähnlichkeitsanalyse", "date_format_hint": "JJJJ-MM-TT" },
    "similarity": {
      "settings": "Einstellungen",
      "radius": "Suchradius [m]",
      "number_of_references": "Anz. Referenzparcels",
      "interval_days": "Interval [Tage]",
      "startdate": "Anfangsdatum",
      "enddate": "Enddatum",
      "crop": "Fruchtart",
      "entity": "Entität",
      "verification": "Überprüfung",
      "getSimilarity": "Starte Analyse"
    },
  },
}

Vue.component('gc-similarity', {
  props: {
    gcWidgetId: {
      type: String,
      default: 'similarity1',
      required: true
    },
    gcLayout: {
      type: String,
      default: 'horizontal' // or horizontal
    },
    gcAvailableOptions: {
      type: String,
      default: 'widgetTitle'
    },
    gcWidgetCollapsed: {
      type: Boolean,
      default: false // or false
    },
    gcLanguage: {
      type: String,
      default: 'en' // 'en' | 'de'
    },
    gcStartdate: {
      type: String,
      default: ''
    },
    gcEnddate: {
      type: String,
      default: ''
    },
    gcRadius: {
      type: Number,
      default: 100000
    },
    gcInterval: {
      type: Number,
      default: 7
    },
    gcReferences: {
      type: Number,
      default: 20
    },
    gcCrop: {
      type: String,
      default: ""
    },
    gcEntity: {
      type: String,
      default: ""
    },
    gcVerification: {
      type: Boolean,
      default: false
    }
  },
  template: `<div :id="this.gcWidgetId" class="">

                <!-- p :class="['gc-options-title', 'is-size-6', !gcWidgetCollapsed ? 'gc-is-primary' : 'gc-is-tertiary']" 
                  style="cursor: pointer; margin-bottom: 0.5em;"    
                  v-on:click="toggleSimilarity" 
                  v-show="availableOptions.includes('widgetTitle')"> {{ $t('options.title')}}
                  <i :class="[!gcWidgetCollapsed ? '': 'is-active', 'fas', 'fa-angle-down', 'fa-sm']"></i>
                </p -->

                <!-- similarity container -->
                <div :class="[!gcWidgetCollapsed ? '': 'is-hidden']" style="margin-bottom: 1em;">

                  <div style="margin-bottom: 0.5em;">
                    <p :class="['gc-options-title', 'is-size-6 ', similaritySettings ? 'gc-is-primary' : 'gc-is-tertiary']" 
                    v-on:click="similaritySettings =! similaritySettings" style="cursor: pointer; margin-bottom: 0.5em!important;">
                    {{ $t('options.title') }} 
                    <i :class="[similaritySettings ? '': 'is-active', 'fas', 'fa-angle-down', 'fa-sm']"></i>
                    </p>
                  </div>

                  <!-- similarity settings -->
                  <div :class="[similaritySettings ? '' : 'is-hidden', layoutCSSMap['alignment'][gcLayout]]" style="">
                    <div :class="['field', 'gc-field-'+gcLayout]">
                      <label class="label gc-is-tertiary is-small has-text-left"> {{ $t('similarity.radius') }} </label>
                      <div class="control">
                        <input type="text" class="input is-small" v-bind:placeholder="$t('radius')" v-model="radius">
                      </div>
                    </div>
                    <div :class="['field', 'gc-field-'+gcLayout]">
                      <label class="label gc-is-tertiary is-small has-text-left"> {{ $t('similarity.interval_days') }} </label>
                      <div class="control">
                        <input type="text" class="input is-small" v-bind:placeholder="$t('interval')" v-model="interval">
                      </div>
                    </div>
                    <div :class="['field', 'gc-field-'+gcLayout]">
                      <label class="label gc-is-tertiary is-small has-text-left"> {{ $t('similarity.number_of_references') }} </label>
                      <div class="control">
                        <input type="text" class="input is-small" v-bind:placeholder="$t('references')" v-model="references">
                      </div>
                    </div>
                    <div :class="['field', 'gc-field-'+gcLayout]">
                      <label class="label gc-is-tertiary is-small has-text-left"> {{ $t('similarity.crop') }} </label>
                      <div class="control">
                        <input type="text" class="input is-small" v-bind:placeholder="$t('crop')" v-model="crop">
                      </div>
                    </div>
                    <div :class="['field', 'gc-field-'+gcLayout]">
                      <label class="label gc-is-tertiary is-small has-text-left"> {{ $t('similarity.entity') }} </label>
                      <div class="control">
                        <input type="text" class="input is-small" v-bind:placeholder="$t('entity')" v-model="entity">
                      </div>
                    </div>
                    <div :class="['field', 'gc-field-'+gcLayout]">
                      <label class="label gc-is-tertiary is-small has-text-left"> {{ $t('similarity.startdate') }} </label>
                      <div class="control">
                        <input :id="'inpstartdate_' + gcWidgetId" type="text" class="input is-small" v-bind:placeholder="$t('options.date_format_hint')" v-model="startDate">
                      </div>
                    </div>
                    <div :class="['field', 'gc-field-'+gcLayout]">
                      <label class="label gc-is-tertiary is-small has-text-left"> {{ $t('similarity.enddate') }} </label>
                      <div class="control">
                        <input :id="'inpenddate_' + gcWidgetId" type="text" class="input is-small" v-bind:placeholder="$t('options.date_format_hint')" v-model="endDate">
                      </div>
                    </div>
                    <!-- div :class="['field', 'gc-field-'+gcLayout]">
                      <div class="field-label is-small">
                        <label class="label gc-is-tertiary has-text-left"> {{ $t('similarity.verification') }} </label>
                      </div -->
                      <!-- centers checkbox -->
                      <!-- div class="field-body" style="position: relative; top: 0.5rem;">
                        <input type="checkbox" class="content is-normal" v-model="verification">
                      </div>
                    </div -->
                  </div> <!-- similarity settings -->
        
                  <!-- similarity buttons -->
                  <div class="is-flex" style="padding-top: 1em;">
                    <button class="button is-light gc-is-primary gc-button-analytics" v-on:click="getSimilarity()">
                      <span class="content"><i class="fas fa-balance-scale fa-sm"></i> {{$t('similarity.getSimilarity') }}</span>
                    </button>
                    <button class="button is-light gc-is-primary" v-on:click="resetSimilarity()" title="Reset">
                      <i class="fas fa-undo fa-sm"></i><span class="content"></span>
                    </button>
                  </div><!-- similarity buttons -->

                </div><!-- similarity container -->

            </div><!-- gcWidgetId -->`,
  data: function () {
    console.debug("gc-similarity - data()");
    return {
        similaritySettings: false,
        startdateCalendar: undefined,
        enddateCalendar: undefined,
        layoutCSSMap: { "alignment": {"vertical": "is-inline-block", "horizontal": "is-flex" }}
    }
  },
  i18n: { 
    locale: this.currentLanguage,
    messages: gcSimilarityLocales
  },
  created: function () {
    console.debug("gc-similarity! - created()");
    this.changeLanguage();
  },
  /* when vue component is mounted (ready) on DOM node */
  mounted: function () {
    console.debug("gc-similarity! - mounted()");
    
    try {
      this.changeLanguage();
    } catch (ex) {}

    this.initDatePickers();
  },
  computed: {
    availableOptions: {
      get: function() {
        return (this.gcAvailableOptions.split(","));
      }
    },
    currentLanguage: {
      get: function() {
        // will always reflect prop's value 
        return this.gcLanguage;
      },
    },
    startDate: {
      get: function() {
        // will always reflect prop's value 
        return this.gcStartdate;
      },
      set: function(value) {
        this.$root.$emit("simStartdateChange", value);
      }
    },
    endDate: {
      get: function() {
        // will always reflect prop's value 
        return this.gcEnddate;
      },
      set: function(value) {
        this.$root.$emit("simEnddateChange", value);
      }
    },
    references: {
      get: function() {
        // will always reflect prop's value 
        return this.gcReferences;
      },
      set: function(value) {
        this.$root.$emit("simReferencesChange", value);
      }
    },
    interval: {
      get: function() {
        // will always reflect prop's value 
        return this.gcInterval;
      },
      set: function(value) {
        this.$root.$emit("simIntervalChange", value);
      }
    },
    radius: {
      get: function() {
        // will always reflect prop's value 
        return this.gcRadius;
      },
      set: function(value) {
        this.$root.$emit("simRadiusChange", value);
      }
    },
    crop: {
      get: function() {
        // will always reflect prop's value 
        return this.gcCrop;
      },
      set: function(value) {
        this.$root.$emit("cropChange", value);
      }
    },
    entity: {
      get: function() {
        // will always reflect prop's value 
        return this.gcEntity;
      },
      set: function(value) {
        this.$root.$emit("entityChange", value);
      }
    },
    verification: {
      get: function() {
        // will always reflect prop's value 
        return this.gcVerification;
      },
      set: function(value) {
        this.$root.$emit("simVerificationChange", value);
      }
    },
  },
  watch: {
    currentLanguage(newValue, oldValue) {
      this.changeLanguage();
      // reinit date pickers for different language
      this.initDatePickers();
    }
  },
  methods: {  
    toggleSimilarity() {
      this.gcWidgetCollapsed = !this.gcWidgetCollapsed;
    },
    changeLanguage() {
      this.$i18n.locale = this.currentLanguage;
    },
    getSimilarity() {
      this.$root.$emit('getSimilarity');
    },
    resetSimilarity() {
      this.$root.$emit('resetSimilarity');
    },
    initDatePickers() {
      
      if (this.startdateCalendar) {
        this.startdateCalendar.destroy();
      }
      this.startdateCalendar = new bulmaCalendar( document.getElementById( 'inpstartdate_'+this.gcWidgetId ), {
        startDate: new Date(), // Date selected by default
        dateFormat: 'yyyy-mm-dd', // the date format `field` value
        lang: this.currentLanguage, // internationalization
        overlay: false,
        closeOnOverlayClick: true,
        closeOnSelect: true,
        align: "right",
        // callback functions
        onSelect: function (e) { 
                    // hack +1 day
                    var a = new Date(e.valueOf() + 1000*3600*24);
                    this.startDate = a.toISOString().split("T")[0]; //ISO String splits at T between date and time
                    }.bind(this),
      });
      if (this.enddateCalendar) {
        this.enddateCalendar.destroy();
      }
      this.enddateCalendar = new bulmaCalendar( document.getElementById( 'inpenddate_'+this.gcWidgetId ), {
        startDate: new Date(), // Date selected by default
        dateFormat: 'yyyy-mm-dd', // the date format `field` value
        lang: this.currentLanguage, // internationalization
        overlay: false,
        closeOnOverlayClick: true,
        closeOnSelect: true,
        align: "right",
        // callback functions
        onSelect: function (e) { 
                    // hack +1 day
                    var a = new Date(e.valueOf() + 1000*3600*24);
                    this.endDate = a.toISOString().split("T")[0]; //ISO String splits at T between date and time
                    }.bind(this),
      });
    }
  }
});
