import { supportContact } from '@/data/landing'

/**
 * Shows an error or notice, turning the words "contact our team" into a WhatsApp link to the person who
 * handles problems. Messages without that phrase are shown as they are.
 */
export function ContactTeamText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(contact our team)/i).map((part, index) =>
        index % 2 === 1 ? (
          <a
            key={index}
            href={supportContact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline underline-offset-2"
          >
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </>
  )
}

export default ContactTeamText
