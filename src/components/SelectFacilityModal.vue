<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="closeModal"> 
          <ion-icon slot="icon-only" :icon="closeOutline" />
        </ion-button>
      </ion-buttons>
      <ion-title>{{ translate("Select facility") }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-radio-group v-model="selectedFacilityIdValue">
      <ion-item v-for="facility in facilities" :key="facility.facilityId">
        <ion-radio label-placement="end" justify="start" :value="facility.facilityId">
          <ion-label>
            {{ facility.facilityName ? facility.facilityName : facility.facilityId }}
            <p>{{ facility.facilityId }}</p>
          </ion-label>
        </ion-radio>
      </ion-item>
    </ion-radio-group>
  </ion-content>

  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button :disabled="selectedFacilityIdValue === selectedFacilityId" @click="saveFacility">
      <ion-icon :icon="saveOutline" />
    </ion-fab-button>
  </ion-fab>
</template>

<script setup lang="ts">
import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonRadio, IonRadioGroup, IonTitle, IonToolbar, modalController } from "@ionic/vue";
import { defineProps, onMounted, ref } from "vue";
import { closeOutline, saveOutline } from "ionicons/icons";
import { translate } from '@hotwax/dxp-components'

const props = defineProps(["selectedFacilityId", "facilities"]);

const selectedFacilityIdValue = ref("");

onMounted(() => {
  selectedFacilityIdValue.value = props.selectedFacilityId
})

function closeModal(payload = {}) {
  modalController.dismiss({ ...payload });
}

function saveFacility() {
  closeModal({ selectedFacilityId: selectedFacilityIdValue.value })
}

</script>

<style scoped>
ion-content {
  --padding-bottom: 80px;
}
</style>