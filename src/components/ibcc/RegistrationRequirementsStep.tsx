import { FileUploadField, RegistrationLink } from './RegistrationFields'
import { REQUIREMENTS } from '@/data/ibccRegistration'
import type { RegistrationErrors, RequirementKey } from '@/types/ibccRegistration'

interface RegistrationRequirementsStepProps {
  files: Record<RequirementKey, File | null>
  errors: RegistrationErrors
  onFileChange: (key: RequirementKey, file: File | null) => void
}

export default function RegistrationRequirementsStep({
  files,
  errors,
  onFileChange,
}: RegistrationRequirementsStepProps) {
  return (
    <div>
      <p className="mb-5 text-sm leading-6 text-slate-600">
        All team members are required to fulfill the requirements below. Each item accepts one JPG
        or PDF file containing the combined proof requested.
      </p>
      <div className="space-y-5">
        {REQUIREMENTS.map(({ key, title, description }) => (
          <section key={key} className="rounded-xl border border-[#E1EAF5] bg-[#F9FBFE] p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
            <p className="mt-1.5 text-sm leading-6 text-slate-600">{description}</p>
            {key === 'twibbon' && (
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-xs leading-5 text-slate-500">
                <li>
                  Download the official Twibbon template and caption from the{' '}
                  <RegistrationLink linkKey="registrationKit">Registration Kit</RegistrationLink>.
                </li>
                <li>Add each member’s photo with their face fully visible.</li>
                <li>Post from each member’s primary public Instagram account and tag us.</li>
                <li>Compile all three screenshots into one file and upload it below.</li>
              </ol>
            )}
            {key === 'poster' && (
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-xs leading-5 text-slate-500">
                <li>
                  Download the official poster from the{' '}
                  <RegistrationLink linkKey="registrationKit">Registration Kit</RegistrationLink>.
                </li>
                <li>Each member reposts it to their public Instagram story and tags us.</li>
                <li>Compile proof from all three members into one file.</li>
              </ol>
            )}
            {key === 'broadcast' && (
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-xs leading-5 text-slate-500">
                <li>
                  Use the official poster and broadcast template from the{' '}
                  <RegistrationLink linkKey="registrationKit">Registration Kit</RegistrationLink>.
                </li>
                <li>Each member sends the broadcast to three different groups.</li>
                <li>
                  Combine the nine delivery screenshots (three per member) into one JPG or PDF.
                </li>
              </ol>
            )}
            <div className="mt-4">
              <FileUploadField
                id={`requirement-${key}`}
                file={files[key]}
                error={errors[`files.${key}`]}
                onChange={(file) => onFileChange(key, file)}
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
