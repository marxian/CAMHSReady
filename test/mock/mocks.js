'use strict';

angular.module('docready')
  .factory('mocks', function(settings){
    var symptoms, items, topics, mailer;

    symptoms = [{
      'url': 'http://docready-staging.herokuapp.com/api/symptom/1',
      'title': 'I feel tired all the time',
      'tags': ['sleep', 'enthusiasm']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/2',
      'title': 'I\'m eating too much',
      'tags': ['appetite']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/3',
      'title': 'I can\'t get to sleep at night',
      'tags': ['sleep']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/4',
      'title': 'I lose my temper too much',
      'tags': ['anxiety', 'relationships']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/5',
      'title': 'Nobody seems to like me',
      'tags': ['anxiety', 'relationships']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/7',
      'title': 'I\'m getting into debt',
      'tags': ['finances']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/8',
      'title': 'My memory is playing tricks on me',
      'tags': ['memory']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/6',
      'title': 'I\'m drinking too much',
      'tags': ['health', 'drinking', 'drug use']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/9',
      'title': 'I don\'t eat properly',
      'tags': ['appetite', 'anxiety', 'health', 'eating']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/10',
      'title': 'I can\'t get out of bed',
      'tags': ['sleep', 'enthusiasm']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/11',
      'title': 'I feel depressed',
      'tags': ['mood', 'thoughts']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/12',
      'title': 'I think about killing myself',
      'tags': ['self harm', 'thoughts']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/13',
      'title': 'I don\'t feel quite real',
      'tags': ['anxiety', 'thoughts', 'unreality']
    }, {
      'url': 'http://docready-staging.herokuapp.com/api/symptom/14',
      'title': 'I\'ve started cutting myself',
      'tags': ['self harm']
    }];
    items = [
        {
            title: 'Item 1',
            slug: 'item-1',
            body: 'Blah',
            topic: 'topic-1',
            weight: 1.0
          },
          {
            title: 'Item 2',
            slug: 'item-2',
            body: '<strong>Blah</strong>',
            topic: 'topic-2',
            weight: 2.0
          },
          {
            title: 'Item 3',
            slug: 'item-3',
            body: 'Blah blah',
            topic: 'topic-2',
            weight: 3.0
          },
          {
            title: 'Item 4',
            slug: 'item-4',
            body: 'Blah blah',
            topic: 'topic-2',
            weight: 4.0
          }
        ];

    topics = [
        {
            title: 'Topic 1',
            slug: 'topic-1',
            weight: 1.0
          },
          {
            title: 'Topic 2',
            slug: 'topic-2',
            weight: 2.0
          },
          {
            title: 'Topic 3',
            slug: 'topic-3',
            weight: 3.0
          },
          {
            title: 'Topic 4',
            slug: 'topic-4',
            weight: 4.0
          }
        ];
    mailer = {};

    function registerMocks($httpBackend) {
      $httpBackend.whenGET(settings.apiRoot + '/advice_topic').respond(topics);
      $httpBackend.whenGET(settings.apiRoot + '/advice_item').respond(items);
      $httpBackend.whenGET(settings.apiRoot + '/symptom').respond(symptoms);
      $httpBackend.whenPOST(settings.apiRoot + '/email').respond(function(method, url, data){
        return [200];
      });
      $httpBackend.whenPOST(settings.apiRoot + '/pdf').respond(function(method, url, data){
        var pdf = "data:application/pdf;base64,JVBERi0xLjMKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovQ29udGVudHMgNCAwIFI+PgplbmRvYmoKNCAwIG9iago8PC9MZW5ndGggNTIwOT4+CnN0cmVhbQowLjU3IHcKMCBHCnEKcSBCVCA0Mi41MiA3OTUuNjIgVGQKMCAtMjQuMDAgVGQKL0YyIDEyLjAwIFRmIChTdGFyIG1lIG9uIEdpdEh1YikgVGoKRVQgUQpxIEJUIDQyLjUyIDc1OS42MiBUZAowIC0xNS4wMCBUZAovRjEgMTMuNTAgVGYgKERvd25sb2FkIE5vdykgVGoKRVQgUQpxIEJUIDQyLjUyIDczNi4zNyBUZAowIC0xNS4wMCBUZAovRjEgMTAuNTAgVGYgKFZlcnNpb24gMC45LjByYzIpIFRqCkVUIFEKcSBCVCA0Mi41MiA3MTMuODcgVGQKMCAtMzAuMDAgVGQKL0YyIDI5LjI1IFRmIChqc1BERikgVGoKRVQgUQpxIEJUIDQyLjUyIDY3Ni4zNyBUZAowIC0xNS4wMCBUZAovRjIgMTMuNTAgVGYgKEhUTUw1IEphdmFTY3JpcHQgUERGIGdlbmVyYXRpb24gbGlicmFyeSBmcm9tICkgVGoKL0YyIDEzLjUwIFRmIChATXJSaW8pIFRqCi9GMiAxMy41MCBUZiAoIGF0ICkgVGoKL0YyIDEzLjUwIFRmIChTbmFwc2hvdCBNZWRpYSkgVGoKRVQgUQpxIEJUIDQyLjUyIDY1My44NyBUZAowIC0zMC4wMCBUZAovRjIgMjQuMDAgVGYgKEhhdmUgYSBwbGF5LikgVGoKRVQgUQpxIEJUIDQyLjUyIDYxNi4zNyBUZAowIC0xNS4wMCBUZAovRjEgMTAuNTAgVGYgKEEgSFRNTDUgY2xpZW50LXNpZGUgc29sdXRpb24gZm9yIGdlbmVyYXRpbmcgUERGcy4gUGVyZmVjdCBmb3IgZXZlbnQgdGlja2V0cywgcmVwb3J0cywgY2VydGlmaWNhdGVzLCB5b3UpIFRqCjAgLTE1LjAwIFRkCi9GMSAxMC41MCBUZiAobmFtZSBpdCEpIFRqCkVUIFEKcSBCVCA0Mi41MiA1NzguODcgVGQKMCAtMTUuMDAgVGQKL0YyIDEwLjUwIFRmIChObyBzZXJ2ZXJzIHdlcmUgdXNlZCBpbiB0aGUgbWFraW5nIG9mIHRoaXMgZGVtby4pIFRqCkVUIFEKcSBCVCA0Mi41MiA1NTYuMzcgVGQKMCAtMTUuMDAgVGQKL0YxIDEwLjUwIFRmIChDaG9vc2UgZXhhbXBsZSkgVGoKRVQgUQpxIEJUIDQyLjUyIDUzNC42MiBUZAowIC0xMi4wMCBUZAovRjEgMTAuNTAgVGYgKEltYWdlcykgVGoKL0YxIDEwLjUwIFRmIChGb250IGZhY2VzKSBUagovRjEgMTAuNTAgVGYgKEhUTUwgUmVuZGVyZXIgXChFYXJseSBzdGFnZXNcKSkgVGoKL0YxIDEwLjUwIFRmIChUd28gcGFnZSBIZWxsbyBXb3JsZCkgVGoKL0YxIDEwLjUwIFRmIChDaXJjbGVzKSBUagovRjEgMTAuNTAgVGYgKEZvbnQgc2l6ZXMpIFRqCi9GMSAxMC41MCBUZiAoTGFuZHNjYXBlKSBUagovRjEgMTAuNTAgVGYgKExpbmVzKSBUagowIC0xMi4wMCBUZAovRjEgMTAuNTAgVGYgKFJlY3RhbmdsZXMpIFRqCi9GMSAxMC41MCBUZiAoU3RyaW5nIFNwbGl0dGluZykgVGoKL0YxIDEwLjUwIFRmIChUZXh0IGNvbG9ycykgVGoKL0YxIDEwLjUwIFRmIChUcmlhbmdsZXMpIFRqCi9GMSAxMC41MCBUZiAoVXNlciBpbnB1dCkgVGoKRVQgUQpxIEJUIDQyLjUyIDQ5Ny4xMiBUZAowIC0xNS4wMCBUZAovRjEgMTAuNTAgVGYgKERvd25sb2FkIFBERikgVGoKRVQgUQpxIEJUIDQyLjUyIDQ3OS4xMiBUZAowIC0xNS4wMCBUZAovRjEgMTAuNTAgVGYgKEF1dG8gcmVmcmVzaCBvbiBjaGFuZ2VzPykgVGoKRVQgUQpxIEJUIDQyLjUyIDQ2MS4xMiBUZAowIC0xNS4wMCBUZAovRjEgMTAuNTAgVGYgKFJ1biBDb2RlKSBUagpFVCBRCnEgQlQgNDIuNTIgNDM3LjEyIFRkCjAgLTE1LjAwIFRkCi9GMSAxMC41MCBUZiAoQXV0byByZWZyZXNoIGRpc2FibGVkIGZvciB0aGlzKSBUagpFVCBRCnEgQlQgNDIuNTIgNDAxLjEyIFRkCjAgLTMwLjAwIFRkCi9GMiAyNC4wMCBUZiAoVGhlIEJhc2ljcykgVGoKRVQgUQpxIEJUIDQyLjUyIDM2My42MiBUZAowIC0xNS4wMCBUZAovRjEgMTAuNTAgVGYgKFNpbXBseSBpbmNsdWRlIHRoZSBqc1BERiBsaWJyYXJ5IGluIHlvdXIgKSBUagovRjUgMTAuNTAgVGYgKDxoZWFkPikgVGoKL0YxIDEwLjUwIFRmICgsIGdlbmVyYXRlIHlvdXIgUERGIHVzaW5nIHRoZSApIFRqCi9GMyAxMC41MCBUZiAobWFueSkgVGoKL0YxIDEwLjUwIFRmICggYnVpbHQtaW4gZnVuY3Rpb25zLCkgVGoKMCAtMTUuMDAgVGQKL0YxIDEwLjUwIFRmICh0aGVuIGhvb2sgdXAgYSBidXR0b24gdG8gdHJpZ2dlciB0aGUgZG93bmxvYWQuIEFsbCB0aGUgZXhhbXBsZXMgaGVyZSB1c2UgalF1ZXJ5LikgVGoKRVQgUQpxIEJUIDQyLjUyIDMyNi4xMiBUZAowIC0zMC4wMCBUZAovRjIgMjQuMDAgVGYgKEJyb3dzZXIgQ29tcGF0aWJpbGl0eSkgVGoKRVQgUQpxIEJUIDQyLjUyIDI4OC42MiBUZAowIC0xNS4wMCBUZAovRjEgMTAuNTAgVGYgKGpzUERGIHdpbGwgd29yayBpbiBJRTYrKiwgRmlyZWZveCAzKywgQ2hyb21lLCBTYWZhcmkgMyssIE9wZXJhLiBGb3IgSUU5IGFuZCBiZWxvdywgd2UgbGF6aWx5IGxvYWQgYSkgVGoKMCAtMTUuMDAgVGQKL0YxIDEwLjUwIFRmIChGbGFzaCBzaGltIGNhbGxlZCBEb3dubG9hZGlmeSB3aGljaCBlbmFibGVzIHRoZSBmaWxlcyB0byBiZSBkb3dubG9hZGVkLikgVGoKRVQgUQpxIEJUIDQyLjUyIDI1MS4xMiBUZAowIC0xNS4wMCBUZAovRjEgMTAuNTAgVGYgKCogQ3VycmVudCBidWlsZCBkb2VzIG5vdCBoYXZlIElFNi05IHNoaW0gZW5hYmxlZCkgVGoKRVQgUQpxIEJUIDQyLjUyIDIyOC42MiBUZAowIC0zMC4wMCBUZAovRjIgMjQuMDAgVGYgKE5lZWQgSGVscD8pIFRqCkVUIFEKcSBCVCA0Mi41MiAxOTEuMTIgVGQKMCAtMTUuMDAgVGQKL0YxIDEwLjUwIFRmIChTZW5kIG1lIGEgKSBUagovRjEgMTAuNTAgVGYgKHR3ZWV0KSBUagovRjEgMTAuNTAgVGYgKCBhbmQgSSdsbCBzZWUgaWYgSSBjYW4gaGVscCA6XCkpIFRqCkVUIFEKcSBCVCA0Mi41MiAxNjguNjIgVGQKMCAtMzAuMDAgVGQKL0YyIDI0LjAwIFRmIChDcmVkaXRzKSBUagpFVCBRCnEgQlQgNDIuNTIgMTMxLjEyIFRkCjAgLTE1LjAwIFRkCi9GMSAxMC41MCBUZiAoQmlnIHRoYW5rcyB0byBEYW5pZWwgRG90c2Vua28gZnJvbSApIFRqCi9GMSAxMC41MCBUZiAoV2lsbG93IFN5c3RlbXMgQ29ycG9yYXRpb24pIFRqCi9GMSAxMC41MCBUZiAoIGZvciBtYWtpbmcgaHVnZSBjb250cmlidXRpb25zIHRvIHRoZSkgVGoKMCAtMTUuMDAgVGQKL0YxIDEwLjUwIFRmIChjb2RlYmFzZS4pIFRqCkVUIFEKcSBCVCA0Mi41MiA5My42MiBUZAowIC0xNS4wMCBUZAovRjEgMTAuNTAgVGYgKFRoYW5rcyB0byBBamF4aWFuLmNvbSBmb3IgKSBUagovRjEgMTAuNTAgVGYgKGZlYXR1cmluZyB1cyBiYWNrIGluIDIwMDkpIFRqCi9GMSAxMC41MCBUZiAoLikgVGoKRVQgUQpxIEJUIDQyLjUyIDcxLjEyIFRkCjAgLTE1LjAwIFRkCi9GMSAxMC41MCBUZiAoRXZlcnlvbmUgZWxzZSB0aGF0J3MgY29udHJpYnV0ZWQgcGF0Y2hlcyBvciBidWcgcmVwb3J0cy4gWW91IHJvY2suKSBUagpFVCBRCnEgQlQgNDIuNTIgNDguNjIgVGQKMCAtMzAuMDAgVGQKL0YyIDI0LjAwIFRmIChMaWNlbnNlKSBUagpFVCBRCnEgQlQgNDIuNTIgMTEuMTIgVGQKMCAtMTUuMDAgVGQKL0YxIDEwLjUwIFRmIChcKE1JVCBMaWNlbnNlXCkpIFRqCkVUIFEKcSBCVCA0Mi41MiAtMTEuMzggVGQKMCAtMTUuMDAgVGQKL0YxIDEwLjUwIFRmIChDb3B5cmlnaHQgXChjXCkgMjAxMC0yMDEyIEphbWVzIEhhbGwsICkgVGoKL0YxIDEwLjUwIFRmIChodHRwczovL2dpdGh1Yi5jb20vTXJSaW8vanNQREYpIFRqCkVUIFEKcSBCVCA0Mi41MiAtMzMuODggVGQKMCAtMTUuMDAgVGQKL0YxIDEwLjUwIFRmIChQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kKSBUagowIC0xNS4wMCBUZAovRjEgMTAuNTAgVGYgKGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyBcKHRoZSAiU29mdHdhcmUiXCksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZykgVGoKMCAtMTUuMDAgVGQKL0YxIDEwLjUwIFRmICh3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcykgVGoKMCAtMTUuMDAgVGQKL0YxIDEwLjUwIFRmIChvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlKSBUagowIC0xNS4wMCBUZAovRjEgMTAuNTAgVGYgKGZvbGxvd2luZyBjb25kaXRpb25zOikgVGoKRVQgUQpxIEJUIDQyLjUyIC0xMTYuMzggVGQKMCAtMTUuMDAgVGQKL0YxIDEwLjUwIFRmIChUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsKSBUagowIC0xNS4wMCBUZAovRjEgMTAuNTAgVGYgKHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS4pIFRqCkVUIFEKcSBCVCA0Mi41MiAtMTUzLjg4IFRkCjAgLTE1LjAwIFRkCi9GMSAxMC41MCBUZiAoVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICJBUyBJUyIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IpIFRqCjAgLTE1LjAwIFRkCi9GMSAxMC41MCBUZiAoSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MpIFRqCjAgLTE1LjAwIFRkCi9GMSAxMC41MCBUZiAoRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTKSBUagowIC0xNS4wMCBUZAovRjEgMTAuNTAgVGYgKE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwpIFRqCjAgLTE1LjAwIFRkCi9GMSAxMC41MCBUZiAoV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUikgVGoKMCAtMTUuMDAgVGQKL0YxIDEwLjUwIFRmIChJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFKSBUagowIC0xNS4wMCBUZAovRjEgMTAuNTAgVGYgKFNPRlRXQVJFLikgVGoKRVQgUQpxIEJUIDQyLjUyIC0yNjYuMzggVGQKMCAtMTUuMDAgVGQKL0YxIDEwLjUwIFRmICipIDIwMTMgSmFtZXMgSGFsbCAtICkgVGoKL0YxIDEwLjUwIFRmIChQcml2YWN5IFBvbGljeSkgVGoKRVQgUQpRCmVuZHN0cmVhbQplbmRvYmoKMSAwIG9iago8PC9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFIgXQovQ291bnQgMQovTWVkaWFCb3ggWzAgMCA1OTUuMjggODQxLjg5XQo+PgplbmRvYmoKNSAwIG9iago8PC9CYXNlRm9udC9IZWx2ZXRpY2EvVHlwZS9Gb250Ci9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKNiAwIG9iago8PC9CYXNlRm9udC9IZWx2ZXRpY2EtQm9sZC9UeXBlL0ZvbnQKL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZwovU3VidHlwZS9UeXBlMT4+CmVuZG9iago3IDAgb2JqCjw8L0Jhc2VGb250L0hlbHZldGljYS1PYmxpcXVlL1R5cGUvRm9udAovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nCi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjggMCBvYmoKPDwvQmFzZUZvbnQvSGVsdmV0aWNhLUJvbGRPYmxpcXVlL1R5cGUvRm9udAovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nCi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjkgMCBvYmoKPDwvQmFzZUZvbnQvQ291cmllci9UeXBlL0ZvbnQKL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZwovU3VidHlwZS9UeXBlMT4+CmVuZG9iagoxMCAwIG9iago8PC9CYXNlRm9udC9Db3VyaWVyLUJvbGQvVHlwZS9Gb250Ci9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKMTEgMCBvYmoKPDwvQmFzZUZvbnQvQ291cmllci1PYmxpcXVlL1R5cGUvRm9udAovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nCi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjEyIDAgb2JqCjw8L0Jhc2VGb250L0NvdXJpZXItQm9sZE9ibGlxdWUvVHlwZS9Gb250Ci9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKMTMgMCBvYmoKPDwvQmFzZUZvbnQvVGltZXMtUm9tYW4vVHlwZS9Gb250Ci9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKMTQgMCBvYmoKPDwvQmFzZUZvbnQvVGltZXMtQm9sZC9UeXBlL0ZvbnQKL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZwovU3VidHlwZS9UeXBlMT4+CmVuZG9iagoxNSAwIG9iago8PC9CYXNlRm9udC9UaW1lcy1JdGFsaWMvVHlwZS9Gb250Ci9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKMTYgMCBvYmoKPDwvQmFzZUZvbnQvVGltZXMtQm9sZEl0YWxpYy9UeXBlL0ZvbnQKL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZwovU3VidHlwZS9UeXBlMT4+CmVuZG9iagoyIDAgb2JqCjw8Ci9Qcm9jU2V0IFsvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJXQovRm9udCA8PAovRjEgNSAwIFIKL0YyIDYgMCBSCi9GMyA3IDAgUgovRjQgOCAwIFIKL0Y1IDkgMCBSCi9GNiAxMCAwIFIKL0Y3IDExIDAgUgovRjggMTIgMCBSCi9GOSAxMyAwIFIKL0YxMCAxNCAwIFIKL0YxMSAxNSAwIFIKL0YxMiAxNiAwIFIKPj4KL1hPYmplY3QgPDwKPj4KPj4KZW5kb2JqCjE3IDAgb2JqCjw8Ci9Qcm9kdWNlciAoanNQREYgMC45LjByYzIpCi9DcmVhdGlvbkRhdGUgKEQ6MjAxMzA1MjQxNTQ5MzcpCj4+CmVuZG9iagoxOCAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMSAwIFIKL09wZW5BY3Rpb24gWzMgMCBSIC9GaXRIIG51bGxdCi9QYWdlTGF5b3V0IC9PbmVDb2x1bW4KPj4KZW5kb2JqCnhyZWYKMCAxOQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDUzNDYgMDAwMDAgbiAKMDAwMDAwNjU3NSAwMDAwMCBuIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAwODcgMDAwMDAgbiAKMDAwMDAwNTQzMyAwMDAwMCBuIAowMDAwMDA1NTIzIDAwMDAwIG4gCjAwMDAwMDU2MTggMDAwMDAgbiAKMDAwMDAwNTcxNiAwMDAwMCBuIAowMDAwMDA1ODE4IDAwMDAwIG4gCjAwMDAwMDU5MDYgMDAwMDAgbiAKMDAwMDAwNjAwMCAwMDAwMCBuIAowMDAwMDA2MDk3IDAwMDAwIG4gCjAwMDAwMDYxOTggMDAwMDAgbiAKMDAwMDAwNjI5MSAwMDAwMCBuIAowMDAwMDA2MzgzIDAwMDAwIG4gCjAwMDAwMDY0NzcgMDAwMDAgbiAKMDAwMDAwNjc5OSAwMDAwMCBuIAowMDAwMDA2ODgxIDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgMTkKL1Jvb3QgMTggMCBSCi9JbmZvIDE3IDAgUgo+PgpzdGFydHhyZWYKNjk4NQolJUVPRg==";
        return [200, { pdf: pdf}, {}];
      });
    }

    return {
      registerMocks: registerMocks,
      data: {
        symptoms: symptoms,
        topics: topics,
        items: items
      }
    };
  });

angular.module('docreadyTest', ['docready', 'ngMockE2E'])
// add a 700ms delay to all mocked requests
.config(function($provide) {
    $provide.decorator('$httpBackend', function($delegate) {
        var proxy = function(method, url, data, callback, headers) {
            var interceptor = function() {
                var _this = this,
                    _arguments = arguments;
                setTimeout(function() {
                    callback.apply(_this, _arguments);
                  }, (method === 'POST') ? 700 : 0);
              };
            return $delegate.call(this, method, url, data, interceptor, headers);
          };
        for(var key in $delegate) {
          proxy[key] = $delegate[key];
        }
        return proxy;
      });
  })
.run(function($httpBackend, mocks) {
  mocks.registerMocks($httpBackend);
  $httpBackend.whenGET().passThrough();
});

angular.element(document).find('body').attr('ng-app', 'docreadyTest');