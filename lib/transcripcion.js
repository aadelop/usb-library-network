/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 /**
 * Un supervisor ha sido asignado a Transcripcion
 * 
 * @param {org.usb.library.programs.SupervisorAsignado} asignarSupervisor - the SupervisorAsignado transaction
 * @transaction
 */
function asignarSupervisor(supervisorAsignado) {
    var transcripcion = supervisorAsignado.transcripcion;
    var NS = 'org.usb.library.programs';
    var factory = getFactory();
    // Add the ShipmentPacked transaction to the ledger (via the Shipment asset)
    transcripcion.supervisorAsignado = supervisorAsignado;
    // Create the message
    var mensaje = 'Supervisor asignado a transcripcion ' + transcripcion.$identifier;
    // Update the Asset Registry
    return getAssetRegistry(NS + '.Transcripcion')
        .then(function (transcripcionRegistry) {
            // add the temp reading to the shipment
            return transcripcionRegistry.update(transcripcion);
        });
}
 /**
 * Un Transcriptor ha sido asignado a Transcripcion
 * 
 * @param {org.usb.library.programs.TranscriptorAsignado} asignarTranscriptor - the TranscriptorAsignado transaction
 * @transaction
 */
function asignarTranscriptor(transcriptorAsignado) {
    var transcripcion = transcriptorAsignado.transcripcion;
    var NS = 'org.usb.library.programs';
    var factory = getFactory();
    // Add the ShipmentPacked transaction to the ledger (via the Shipment asset)
    transcripcion.transcriptorAsignado = transcriptorAsignado;
    // Create the message
    var mensaje = 'Transcriptor asignado a transcripcion ' + transcripcion.$identifier;
    // Update the Asset Registry
    return getAssetRegistry(NS + '.Transcripcion')
        .then(function (transcripcionRegistry) {
            // add the temp reading to the shipment
            return transcripcionRegistry.update(transcripcion);
        });
}
 /**
 * Se realiza validacion final a una Transcripcion por Auditor
 * 
 * @param {org.usb.library.programs.TranscripPorValidar} validarTranscrip - the TranscripPorValidar transaction
 * @transaction
 */
function validarTranscrip (transcripPorValidar){
    var transcripcion = transcripPorValidar.transcripcion;
    var NS = 'org.usb.library.programs';
    var factory = getFactory();
    transcripcion.estado = "PENDIENTE"
    // Create the message
    var mensaje = 'Transcripcion enviada para revision final' + transcripcion.$identifier;
    // Update the Asset Registry
    return getAssetRegistry(NS + '.Transcripcion')
        .then(function (transcripcionRegistry) {
            // add the temp reading to the shipment
            return transcripcionRegistry.update(transcripcion);
        });

}
/**
 * Se realiza aprobacion a una Transcripcion por Auditor para posterior inclusion
 * como programa 
 * 
 * @param {org.usb.library.programs.TranscripAprobada} aprobarTranscrip - the TranscipAprobada transaction
 * @transaction
 */
function aprobarTranscrip (transcripAprobada){
    var transcripcion = transcripAprobada.transcripcion;
    var NS = 'org.usb.library.programs';
    var factory = getFactory();
    transcripcion.estado = "APROBADA"
    // Create the message
    var mensaje = 'Transcripcion aprobada para su inclusion como programa' + transcripcion.$identifier;
    // Update the Asset Registry
    return getAssetRegistry(NS + '.Transcripcion')
        .then(function (transcripcionRegistry) {
            // add the temp reading to the shipment
            return transcripcionRegistry.update(transcripcion);
        });
}

/**
 * Envio de revision con propuestas de cambios para Transcriptor
 * agrega una revision a la lista de revisiones.
 * 
 * @param {org.usb.library.programs.RevisionTranscrip} enviarRevision - the RevisionTranscrip transaction
 * @transaction
 */

function enviarRevision(revisionTranscrip){
    var transcripcion = revisionTranscrip.transcripcion;
    var NS = 'org.usb.library.programs';
    var factory = getFactory();

  
    console.log("revisiones:" + transcripcion.revisionesTranscrip);
  if(transcripcion.revisionesTranscrip == undefined){

     transcripcion.revisionesTranscrip = [revisionTranscrip];
    }
   else {
        transcripcion.revisionesTranscrip.push(revisionTranscrip);
     }
  
    return getAssetRegistry(NS + '.Transcripcion')
        .then(function (transcripcionRegistry) {
            // add the temp reading to the shipment
            console.log("Guardado");
            return transcripcionRegistry.update(transcripcion);
            
        });
}
/**
 * Envio de observacion final con propuesta de modificacion 
 * para validar cumplimiento de formato.
 * Se agrega una obseracion a la lista de observaciones.
 * @param {org.usb.library.programs.ObservacionTranscrip} enviarObservacion - the ObservacionTranscrip transaction
 * @transaction
 */

function enviarObservacion(observacionTranscrip){
    var transcripcion = observacionTranscrip.transcripcion;
    var NS = 'org.usb.library.programs';
    var factory = getFactory();

  
  if(transcripcion.observaciones == undefined){

     transcripcion.observaciones = [observacionTranscrip];
    }
   else {
        transcripcion.observaciones.push(observacionTranscrip);
     }
  
    return getAssetRegistry(NS + '.Transcripcion')
        .then(function (transcripcionRegistry) {
            // add the temp reading to the shipment
            console.log("Guardado");
            return transcripcionRegistry.update(transcripcion);
            
        });
}
