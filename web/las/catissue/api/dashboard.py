from piston.handler import BaseHandler
from piston.handler import AnonymousBaseHandler
from catissue.tissue.models import *
from django.core import serializers
from django.db import models
from django.http import HttpResponse
from django.db.models import Q
import string
import operator,random
from catissue.api.utils import *
from catissue.tissue.utils import *
import datetime
import urllib, urllib2, json,ast,requests
from django.views.decorators.csrf import csrf_exempt
from django.contrib import auth
from django.conf import settings
from django.template.loader import render_to_string
from django.core.mail import send_mail, EmailMultiAlternatives
from itertools import chain
from django.utils.decorators import method_decorator
from catissue.apisecurity.decorators import get_functionality_decorator
from dateutil.relativedelta import *
from catissue.global_request_middleware import *
import inspect
from catissue import tissue
from piston.utils import rc
from urllib2 import HTTPError
from django.utils import timezone

# per aliquote in derivazione
class AliquotDerivationHandler(BaseHandler):
    allowed_methods = ('GET', 'POST')
    @method_decorator(get_functionality_decorator)
    def read(self, request, nome):
        try:
            disable_graph()
            lista1=AliquotDerivationSchedule.objects.filter(Q(derivationExecuted=0)&Q(Q(operator=nome)|Q(operator=''))&Q(loadQuantity=None)&Q(idKit=None)&Q(deleteTimestamp=None)).order_by('id')
            lista2=AliquotDerivationSchedule.objects.filter(Q(derivationExecuted=0)&Q(Q(operator=nome)|Q(operator=''))&~Q(idDerivationProtocol=None)&Q(idKit=None)&~Q(loadQuantity=None)&~Q(initialDate=None)&Q(volumeOutcome=None)&Q(measurementExecuted=0)&Q(deleteTimestamp=None)).order_by('validationTimestamp','initialDate','id')
            lista3=AliquotDerivationSchedule.objects.filter(Q(derivationExecuted=0)&Q(Q(operator=nome)|Q(operator=''))&~Q(idDerivationProtocol=None)&~Q(loadQuantity=None)&~Q(initialDate=None)&Q(volumeOutcome=None)&Q(measurementExecuted=0)&Q(deleteTimestamp=None)).order_by('validationTimestamp','initialDate','id')
            lista4=AliquotDerivationSchedule.objects.filter(Q(derivationExecuted=0)&Q(Q(operator=nome)|Q(operator=''))&~Q(idDerivationProtocol=None)&~Q(initialDate=None)&Q(measurementExecuted=1)&Q(deleteTimestamp=None)).order_by('validationTimestamp','initialDate','id')
            # Nel primo step vedro' sempre le stesse aliquote, sia robot che manuale
            featrobot=FeatureDerivation.objects.get(name='Robot')
            lisprotrobot=FeatureDerProtocol.objects.filter(idFeatureDerivation=featrobot).values_list('idDerProtocol',flat=True)
            lista2Robot=AliquotDerivationSchedule.objects.filter(Q(derivationExecuted=0)&Q(Q(operator=nome)|Q(operator=''))&~Q(idDerivationProtocol=None)&Q(idDerivationProtocol__in=lisprotrobot)&Q(idKit=None)&~Q(loadQuantity=None)&~Q(initialDate=None)&Q(volumeOutcome=None)&Q(measurementExecuted=0)&Q(deleteTimestamp=None)).order_by('validationTimestamp','initialDate','id')
            lista3Robot=AliquotDerivationSchedule.objects.filter(Q(derivationExecuted=0)&Q(Q(operator=nome)|Q(operator=''))&~Q(idDerivationProtocol=None)&Q(idDerivationProtocol__in=lisprotrobot)&~Q(loadQuantity=None)&Q(measurementExecuted=0)&Q(deleteTimestamp=None)).order_by('validationTimestamp','initialDate','id')
            #prendo gli idplanrobot che mi servono per avere tutte le derivazioni, anche quelle fallite
            lisplanrobot=list(AliquotDerivationSchedule.objects.filter(Q(derivationExecuted=0)&Q(Q(operator=nome)|Q(operator=''))&~Q(idDerivationProtocol=None)&Q(idDerivationProtocol__in=lisprotrobot)&Q(measurementExecuted=1)&Q(volumeOutcome__isnull=False)&Q(deleteTimestamp=None)).values_list('idPlanRobot',flat=True))
            #Nella lista dei planrobot vedo quali sono quelli le cui misure sono gia' state salvate e che quindi devono comparire nel quarto passo della derivazione
            lisplanhamilton=PlanHamilton.objects.filter(id__in=lisplanrobot,processed__isnull=False)
            lisplanfin=[]
            for p in lisplanhamilton:
                lisplanfin.append(p.id)    
            lista4Robot=AliquotDerivationSchedule.objects.filter(Q(idPlanRobot__in=lisplanfin)&Q(Q(operator=nome)|Q(operator=''))&~Q(idDerivationProtocol=None)&Q(idDerivationProtocol__in=lisprotrobot)&Q(deleteTimestamp=None)).order_by('validationTimestamp')
            enable_graph()

            liskitsi=[]
            for aliq in lista2:
                if aliq.idDerivationProtocol.idKitType!=None:
                    liskitsi.append(aliq)
            
            liskitsiRobot=[]
            for aliq in lista2Robot:
                if aliq.idDerivationProtocol.idKitType!=None:
                    liskitsiRobot.append(aliq)
            
            #devo filtrare ancora per togliere quelli che non hanno un kit, ma che dovrebbero averlo
            lisfin=[]
            for aliq in lista3:
                if aliq.idKit!=None or aliq.idDerivationProtocol.idKitType==None:
                    lisfin.append(aliq)
                    
            lisfinRobot=[]
            for aliq in lista3Robot:
                if aliq.idKit!=None or aliq.idDerivationProtocol.idKitType==None:
                    lisfinRobot.append(aliq)
            
            liste = []
            liste.append(len(lista1))
            liste.append(len(liskitsi))
            liste.append(len(lisfin))
            liste.append(len(lista4))

            listeRobot = []
            listeRobot.append(len(liskitsiRobot))
            listeRobot.append(len(lisfinRobot))
            listeRobot.append(len(lista4Robot))
            # return json.dumps(liste)
            return {'data':liste, 'dataRobot':listeRobot}
        except Exception, e:
            print 'err',e
            return {'data':'errore'}

# per aliquote in split
class AliquotSplitHandler(BaseHandler):
    allowed_methods = ('GET', 'POST')
    @method_decorator(get_functionality_decorator)
    def read(self, request, nome):
        try:
            disable_graph()
            # Query con accesso alla tabella collegata (SplitSchedule) e selezione dell'utente corretto
            lista=AliquotSplitSchedule.objects.filter(splitExecuted=0, deleteTimestamp=None, idSplitSchedule__operator=nome)
            enable_graph()
            # mdamUrl = Urls.objects.get(idWebService=WebService.objects.get(name='MDAM').id)
            # url = mdamUrl.url + "/api/runtemplate/"
            # ''' Split not executed template '''
            # values_to_send = {'template_id':56}
            # data = urllib.urlencode(values_to_send)

            # try:
            #     u = urllib2.urlopen(url, data)
            # except Exception, e:
            #     print e
            #     print "An error occurred while trying to retrieve data from "+str(url)
            #     return 'errore'

            # res=u.read()
            # result=json.loads(res)
            
            # resSet = []
            # for x in result['body']: # Object
            #     resSet.append(x) # Vettore di aliquot split schedule

            # return json.dumps(len(resSet))
            # return {'data':len(resSet)}
            return {'data':len(lista)}
        except Exception, e:
            print 'err',e
            return {'data':'errore'}

# per aliquote in slide labelling
class AliquotSlideLabHandler(BaseHandler):
    allowed_methods = ('GET', 'POST')
    @method_decorator(get_functionality_decorator)
    def read(self, request, nome):
        try:
            operat=User.objects.get(username=nome)
            disable_graph()
            lista=AliquotLabelSchedule.objects.filter(Q(executed=0)&Q(fileInserted=0)&Q(Q(operator=operat)|Q(operator=None))&Q(deleteTimestamp=None))
            enable_graph()
            # return json.dumps(len(lista))
            return {'data':len(lista)}
        except Exception, e:
            print 'error', e
            return {'data':'errore'}

# per aliquote in slide preparation
class AliquotSlidePrepHandler(BaseHandler):
    allowed_methods = ('GET', 'POST')
    @method_decorator(get_functionality_decorator)
    def read(self, request, nome):
        try:
            operatore=User.objects.get(username=nome)
            disable_graph()
            lista=AliquotSlideSchedule.objects.filter(Q(executed=0)&Q(Q(operator=operatore)|Q(operator=None))&Q(deleteTimestamp=None))
            enable_graph()
            # return json.dumps(len(lista))
            return {'data':len(lista)}
        except Exception, e:
            print 'error', e
            return {'data':'errore'}

# per aliquote in QC QA
class AliquotRevalueHandler(BaseHandler):
    allowed_methods = ('GET', 'POST')
    @method_decorator(get_functionality_decorator)
    def read(self, request, nome):
        try:
            disable_graph()
            # Query con accesso alla tabella collegata (QualitySchedule) e selezione dell'utente corretto
            lista=AliquotQualitySchedule.objects.filter(revaluationExecuted=0, deleteTimestamp=None, idQualitySchedule__operator=nome)
            enable_graph()
            # return json.dumps(len(lista))
            return {'data':len(lista)}
        except Exception, e:
            print 'error', e
            return {'data':'errore'}

# per aliquote in trasferimento
class AliquotTransferHandler(BaseHandler):
    allowed_methods = ('GET', 'POST')
    @method_decorator(get_functionality_decorator)
    def read(self, request, nome):
        try:
            operatore=User.objects.get(username=nome)
            disable_graph()
            transfer_list = Transfer.objects.filter(Q(Q(operator=operatore)|Q(operator=None))&Q(deleteOperator=None)&Q(departureExecuted=0))
            receive_list = Transfer.objects.filter(addressTo=operatore,deleteOperator=None,departureExecuted=1,deliveryExecuted=0)
            enable_graph()
            lista = []
            lista.append(len(transfer_list))
            lista.append(len(receive_list))
            # return json.dumps(lista)
            return {'data':lista}
        except Exception, e:
            print 'error', e
            return {'data':'errore'}

class CollectionsHandler(BaseHandler):
    allowed_methods = ('GET', 'POST')
    @method_decorator(get_functionality_decorator)
    def read(self, request):
        try:
            mdamUrl = Urls.objects.get(idWebService=WebService.objects.get(name='MDAM').id)
            url = mdamUrl.url + "/api/runtemplate/"
            values_to_send = {'template_id':4} # All collections default template
            data = urllib.urlencode(values_to_send)

            try:
                u = urllib2.urlopen(url, data)
            except Exception, e:
                print e
                print "An error occurred while trying to retrieve data from "+str(url)
                return 'errore'

            res=u.read()
            result=json.loads(res)

            myCollections = dict()
            collectionVect = []
            resSet = []
            for x in result['body']: # Object
                if x[3] in myCollections:
                    myCollections[x[3]]['value'] = myCollections[x[3]]['value'] + 1
                else:
                    myCollections[x[3]] = {'type':x[3], 'value': 1}
                resSet.append(x) # Vettore di collezioni
                # print x[0] # CHC0001
            
            for k in myCollections:
                collectionVect.append(myCollections[k])
            
            return {'data':resSet, 'myCollections':collectionVect}
        except Exception, e:
            print 'error', e
            return {'data':'errore'}

# class ImplantedMiceHandler(BaseHandler):
#     allowed_methods = ('GET', 'POST')
#     @method_decorator(get_functionality_decorator)
#     def read(self, request, nome):
#         try:
#             operatore=User.objects.get(username=nome)
#             disable_graph()
#             listaWG = WG_User.objects.filter(user=operatore)
#             enable_graph()
#             wg_set = set()
#             for wgUser in listaWG:
#                 currentWG = set(str(wgUser.WG))
#                 if currentWG.isdisjoint(wg_set):
#                     wg_set.add(str(wgUser.WG))

#             mdamUrl = Urls.objects.get(idWebService=WebService.objects.get(name='MDAM').id)
#             url = mdamUrl.url + "/api/runtemplate/"
#             ''' Mice Implanted template (admin) '''
#             ''' {"name": "WG",
#                 "bq_par_id": 0,
#                 "src_f_id": 236,
#                 "src_block_id": "5",
#                 "type": 7,
#                 "src_button_id": 62,
#                 "description": ""}, '''
#             ''' Parametri Template 41: [{
#                 "name": "WG",
#                 "bq_par_id": 0,
#                 "src_f_id": 236,
#                 "src_block_id": "5",
#                 "type": 7,
#                 "src_button_id": 62,
#                 "description": ""}] '''
#             ### wg = ['admin', 'test_WG']
#             parameters= [{'id':'0', 'values':list(wg_set)}]
#             values_to_send = {'template_id':64, 'parameters':json.dumps(parameters)}
#             data = urllib.urlencode(values_to_send)

#             try:
#                 u = urllib2.urlopen(url, data)
#             except Exception, e:
#                 print e
#                 print "An error occurred while trying to retrieve data from "+str(url)
#                 return 'errore'

#             res=u.read()
#             result=json.loads(res)

#             resSet = []
#             for x in result['body']: # Object
#                 resSet.append(x) # Vettore di topi
#             testWg = list(get_WG())
#             print 'Test WG: ', testWg
#             print 'All WG:', wg_set
#             print 'Test: ', len(result['body'])
#             return {'data':len(resSet)}
#         except Exception, e:
#             print 'error', e
#             return {'data':'errore'}