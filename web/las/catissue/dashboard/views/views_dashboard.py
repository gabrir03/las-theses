from __init__ import *

from utils import *

@laslogin_required
@login_required
# @permission_decorator('tissue.can_view_BBM_dashboard')
def dashboardHome(request):
    try:
        # if request.method=='POST':
        #     print request.POST
            # form = CollectionFunnelForm(request.POST)
        # else:
            # form = CollectionFunnelForm()
        name=request.user.username
        print 'name', name

        # lista_der=AliquotDerivationSchedule.objects.all()
        # # lista2=AliquotDerivationSchedule.objects.filter(derivationExecuted=0,operator='',loadQuantity=None,idKit=None,deleteTimestamp=None)
        # # lista=list(chain(lista1,lista2))
        # print 'lista aliq derivation',lista_der

        # lista_split=AliquotSplitSchedule.objects.filter(splitExecuted=0,deleteTimestamp=None)
        # print 'lista aliq split',lista_split

        # operat=User.objects.get(username=name)
        # lista_slide=AliquotSlideSchedule.objects.filter(executed=0,operator=operat,deleteTimestamp=None)
        # print 'lista aliq slide',lista_slide

        # mdamTemplates = getAllMdamTemplates()
        # for t in mdamTemplates:
        #     print 'template',t

        # splitNotEx = getMdamTemplates([56])
        # print 'Mdam Split Template', splitNotEx
        
        allDerAliq = getAllAliquotDerivationSchedule(name)
        print 'All Aliquots', allDerAliq

        cntAliqDer = 0
        for aliq in allDerAliq:
            cntAliqDer += len(aliq)

        print 'All Aliquots Number', cntAliqDer

        variables = RequestContext(request, {'form': True, 'cntAliqDer':cntAliqDer, 'MEDIA_DASHBOARD_URL':MEDIA_DASHBOARD_URL})
        return render_to_response('indexDH.html',variables)
    except Exception,e:
        print 'errore',e
        variables = RequestContext(request, {'errore':True})
        return render_to_response('indexDH.html',variables)

# def index(request):
#     return HttpResponse("Hello, world. You're at the dashboard index.")
