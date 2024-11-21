import { Phone, Mail, Globe, Linkedin } from 'lucide-react';
import { useAuth } from '../lib/auth';

export function CardProfile() {
  const { user } = useAuth();

  const contactDetails = {
    name: 'Ange KANGA',
    title: 'Gérante',
    company: 'Locimo Services',
    phone: '+33669352128',
    email: 'contact@locimoservices.fr',
    website: 'locimoservices.fr',
    linkedin: 'https://linkedin.com/in/ange-audrey-kanga'
  };

  const generateVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contactDetails.name}
TITLE:${contactDetails.title}
ORG:${contactDetails.company}
TEL;TYPE=WORK,VOICE:${contactDetails.phone}
EMAIL;TYPE=WORK:${contactDetails.email}
URL:${contactDetails.website}
X-SOCIALPROFILE;TYPE=linkedin:${contactDetails.linkedin}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${contactDetails.name}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Header with curved background */}
        <div className="relative h-48 bg-locimo-blue rounded-b-[4rem]">
          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || ''}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-400">
                    AK
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile content */}
        <div className="pt-20 pb-8 px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {contactDetails.name}
          </h2>
          <p className="text-gray-600 mt-1">{contactDetails.title}</p>
          <p className="text-gray-600">{contactDetails.company}</p>

          <p className="mt-6 text-gray-600 text-sm">
            Bonjour, je supervise les opérations et le développement de Locimo Services, 
            assurant une gestion efficace des propriétés et des clés.
          </p>

          {/* Contact information */}
          <div className="mt-8 space-y-6">
            <a
              href={`tel:${contactDetails.phone}`}
              className="flex items-center gap-6 text-gray-600 hover:text-locimo-blue transition-colors pl-4"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-left">
                <p className="text-lg font-medium">{contactDetails.phone}</p>
                <p className="text-sm text-gray-500">Professionnel</p>
              </div>
            </a>

            <a
              href={`mailto:${contactDetails.email}`}
              className="flex items-center gap-6 text-gray-600 hover:text-locimo-blue transition-colors pl-4"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-lg font-medium">{contactDetails.email}</p>
                <p className="text-sm text-gray-500">Professionnel</p>
              </div>
            </a>

            <a
              href={`https://${contactDetails.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 text-gray-600 hover:text-locimo-blue transition-colors pl-4"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-left">
                <p className="text-lg font-medium">{contactDetails.website}</p>
                <p className="text-sm text-gray-500">Entreprise</p>
              </div>
            </a>
          </div>

          {/* Social links */}
          <div className="mt-8">
            <p className="text-gray-600 mb-4">Me retrouver sur</p>
            <div className="flex justify-center">
              <a
                href={contactDetails.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#0A66C2] text-white rounded-full hover:bg-opacity-90 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Add to contacts button */}
          <button
            onClick={generateVCard}
            className="mt-8 w-full bg-locimo-blue text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors"
          >
            <Phone className="h-5 w-5" />
            Ajouter aux contacts
          </button>
        </div>
      </div>
    </div>
  );
}