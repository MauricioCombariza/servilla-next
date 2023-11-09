regex = [
    {
        'patron': r'(calle|Calle|CALLE|cle|CLE|CLL|cll|Cll)',
        'reemplazo': 'CL'
    },
    {
        'patron': r'(carrera|Carrera|CARRERA|KARRERA|karrera|KRA|Kra|kra|KR|kr|crr|Crr|CRR|CRA|cra|Cra|car|Car|CAR|Cta|cta|CTA|Cr)',
        'reemplazo': 'CR'
    },
    {
        'patron': r'(#|[.]|[-]|[/])',
        'reemplazo': ' '
    },
    {
        'patron': r'(Transversal|TRANSVERSAL|transversal|tran|Tran|TRAN|Trv|trv|TRV|TVS|Tvs|tvs)',
        'reemplazo': 'TV'
    },
    {
        'patron': r'(Diagonal|DIAGONAL|diagonal|diag|Diag|DIAG|DIA|dia)',
        'reemplazo': 'DG'
    },
    {
        'patron': r'(Avenida|avenida|AVENIDA|Av|av)',
        'reemplazo': 'AV'
    },
    {
        'patron': r'(Apartamento|APARTAMENTO|apartamento|Apto|apto|APTO|APAR|Apar|apar|APTT|aptt|Aptt)',
        'reemplazo': 'APT'
    },
    {
        'patron': r'(Casa|CASA|casa)',
        'reemplazo': 'CS'
    },
    {
        'patron': r'(Piso|PISO|piso)',
        'reemplazo': 'PS'
    },
    {
        'patron': r'(Conjunto|CONJUNTO|conjunto)',
        'reemplazo': 'CJTO'
    },
    {
        'patron': r'(Torre|TORRE|torre|TRR)',
        'reemplazo': 'TR'
    },
    {
        'patron': r'(Interior|INTERIOR|interior)',
        'reemplazo': 'INT'
    },
    {
        'patron': r'(Bloque|BLOQUE|bloque)',
        'reemplazo': 'BQ'
    },
    {
        'patron': r'(\sN\s|\sn\s|\sNo\s|\sNO\s|\sno\s|NUMERO|Numero|numero)',
        'reemplazo': ''
    },
]

