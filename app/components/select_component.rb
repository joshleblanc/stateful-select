class SelectComponent < ViewComponentReflex::Component
  def initialize(multiple: false, html_options: {}, creatable: false, clearable: false, url: nil, value: nil, **rest)
    @html_options = {
      **html_options,
      data: {
        target: "select.select",
        "reflex-dataset": "combined"
      }
    }
    @url = url
    @html_options[:data].merge!(html_options[:data] || {})
    @html_options[:multiple] = multiple
    @creatable = creatable
    @clearable = clearable
    @multiple = multiple
    @rest = rest
    @value = value
  end

end
