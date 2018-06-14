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
 * Instancia a los participantes del modelo
 * 
 * @param {org.usb.library.programs.InstanciarParticipantes} crearParticipantes - the InstanciarParticipante transaction
 * @transaction
 */

function crearParticipantes(){
        var factory = getFactory();
        var NS = 'org.usb.library.programs';
    
        // crear Proponente
        var proponente = factory.newResource(NS, 'Proponente', 'P_PROP001');
        proponente.nombre = "Coord. Computacion";
        proponente.rolAcademico = "Coordinacion";
  
        //crear Transcriptor
        var transcriptor = factory.newResource(NS, 'Transcriptor', 'P_TRANS001');
        transcriptor.nombre = "Alfredo";
        transcriptor.apellido = "Delgado";
        transcriptor.rolAcademico = "Estudiante";
  
        //crear Supervisor
        var supervisor =factory.newResource(NS, 'Supervisor', 'P_SUPER001');
        supervisor.nombre = "Alejandro";
        supervisor.apellido = "Teruel";
        supervisor.rolAcademico = "Profesor";
  
        //crear Auditor
        var auditor =factory.newResource(NS, 'Auditor', 'P_AUDIT001');
        auditor.rolAcademico = "DACE";
    
         return getParticipantRegistry(NS + '.Proponente')
            .then(function (proponenteRegistry) {
                // agregar proponente
                return proponenteRegistry.addAll([proponente]);
            })
           .then(function() {
                return getParticipantRegistry(NS + '.Transcriptor');
            })
            .then(function(transcriptorRegistry) {
                // agregar transcriptor
                return transcriptorRegistry.addAll([transcriptor]);
            })
             .then(function() {
                return getParticipantRegistry(NS + '.Supervisor');
            })
            .then(function(supervisorRegistry) {
                // agregar supervisor
                return supervisorRegistry.addAll([supervisor]);
            })
            .then(function() {
                return getParticipantRegistry(NS + '.Auditor');
            })
            .then(function(auditorRegistry) {
                // agregar auditor
                return auditorRegistry.addAll([auditor]);
            }) 
}
