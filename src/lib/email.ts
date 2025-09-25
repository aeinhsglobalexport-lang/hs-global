import emailjs from '@emailjs/browser';

export const initEmailJs = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
  if (publicKey) {
    try {
      emailjs.init(publicKey);
    } catch {}
  }
};

export const sendEmail = async (
  templateId: string,
  variables: Record<string, any>,
  serviceId?: string,
) => {
  const svc = serviceId || (import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined) || '';
  const tpl = templateId;
  if (!svc || !tpl) throw new Error('EmailJS service/template not configured');
  return emailjs.send(svc, tpl, variables);
};






