import { UserRound, Tag, GraduationCap, MapPin, LayoutGrid, Mail } from 'lucide-react'
import {
  TextField,
  SelectField,
  PhoneField,
  TwibbonUpload,
  LogoUpload,
} from '@/components/ibcc/FormControls'
import SectionHeader from '@/components/ibcc/SectionHeader'
import { CITY_OPTIONS, COUNTRY_CODES, CATEGORY_OPTIONS } from '@/data/teamRegistration'
import type { FormErrors, UpdateField } from '@/hooks/useTeamRegistrationForm'
import type { TeamRegistrationFormState } from '@/types/teamRegistration'

import teamInformationIcon from '@/assets/ic-team-information.svg'
import whatsappIcon from '@/assets/ic-whatsapp.svg'

interface TeamInformationFormProps {
  form: TeamRegistrationFormState
  errors: FormErrors
  updateField: UpdateField
}

export default function TeamInformationForm({
  form,
  errors,
  updateField,
}: TeamInformationFormProps) {
  return (
    <section className="rounded-3xl border border-white bg-ds-white p-5 shadow-ds-lg sm:p-8">
      <SectionHeader
        icon={teamInformationIcon}
        title="Team information"
        description="Use the official name shown in the competition."
      />

      <div className="mt-5 space-y-4">
        <TextField
          id="teamName"
          label="Team Name"
          required
          icon={<UserRound />}
          placeholder="Enter your team name"
          value={form.teamName}
          onChange={(e) => updateField('teamName')(e.target.value)}
          error={errors.teamName}
        />
        <TextField
          id="teamTag"
          label="Team Short Name / Tag"
          required
          icon={<Tag />}
          placeholder="e.g. ARC-Alpha"
          value={form.teamTag}
          onChange={(e) => updateField('teamTag')(e.target.value)}
          error={errors.teamTag}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            id="institution"
            label="Institution"
            required
            icon={<GraduationCap />}
            placeholder="University or school"
            value={form.institution}
            onChange={(e) => updateField('institution')(e.target.value)}
            error={errors.institution}
          />
          <SelectField
            id="city"
            label="City"
            required
            icon={<MapPin />}
            placeholder="Select city"
            options={CITY_OPTIONS}
            value={form.city}
            onChange={updateField('city')}
            error={errors.city}
          />
        </div>

        <SelectField
          id="competitionCategory"
          label="Competition Category"
          required
          icon={<LayoutGrid />}
          placeholder="Select a category"
          options={CATEGORY_OPTIONS}
          value={form.competitionCategory}
          onChange={(v) =>
            updateField('competitionCategory')(
              v as TeamRegistrationFormState['competitionCategory'],
            )
          }
          error={errors.competitionCategory}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            id="contactEmail"
            type="email"
            label="Contact Email"
            required
            icon={<Mail />}
            placeholder="team@example.com"
            value={form.contactEmail}
            onChange={(e) => updateField('contactEmail')(e.target.value)}
            error={errors.contactEmail}
          />
          <PhoneField
            id="whatsappNumber"
            label="WhatsApp Number"
            required
            icon={<img src={whatsappIcon} alt="" className="h-4 w-4" />}
            countryCode={form.whatsappCountryCode}
            countryCodes={COUNTRY_CODES}
            number={form.whatsappNumber}
            onCountryCodeChange={updateField('whatsappCountryCode')}
            onNumberChange={updateField('whatsappNumber')}
            error={errors.whatsappNumber}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_140px]">
          <TwibbonUpload
            id="twibbon"
            file={form.twibbonFile}
            onChange={updateField('twibbonFile')}
            error={errors.twibbonFile}
          />
          <LogoUpload id="teamLogo" file={form.logoFile} onChange={updateField('logoFile')} />
        </div>
      </div>
    </section>
  )
}
